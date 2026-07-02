"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type AdminState = { ok?: boolean; error?: string } | undefined;

/** Throw-guard: every admin mutation re-verifies the role server-side. */
async function assertAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }
  return session.user;
}

function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseExpeditionForm(formData: FormData) {
  const kind = String(formData.get("kind") ?? "TREK") === "PEAK" ? "PEAK" : "TREK";
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    kind: kind as "TREK" | "PEAK",
    band: kind === "PEAK" ? String(formData.get("band") ?? "").trim() || null : null,
    region: String(formData.get("region") ?? "").trim(),
    meta: String(formData.get("meta") ?? "").trim(),
    days: String(formData.get("days") ?? "").trim(),
    altitude: String(formData.get("altitude") ?? "").trim(),
    grade: String(formData.get("grade") ?? "").trim(),
    priceUSD: parseInt(String(formData.get("priceUSD") ?? "0").replace(/[^\d]/g, ""), 10) || 0,
    season: String(formData.get("season") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim(),
    blurb: String(formData.get("blurb") ?? "").trim(),
    overview: lines(formData.get("overview")),
    image: String(formData.get("image") ?? "").trim(),
    // hero mirrors the card image (single uploader drives both)
    hero: String(formData.get("image") ?? "").trim(),
    // gallery + availableDates arrive as multiple inputs of the same name
    gallery: formData.getAll("gallery").map((v) => String(v).trim()).filter(Boolean),
    highlights: lines(formData.get("highlights")),
    included: lines(formData.get("included")),
    notIncluded: lines(formData.get("notIncluded")),
    availableDates: formData.getAll("availableDates").map((v) => String(v).trim()).filter(Boolean),
    flagship: formData.get("flagship") === "on",
    published: formData.get("published") === "on",
  };
}

/** Itinerary rows arrive as parallel arrays day[], title[], detail[]. */
function parseItinerary(formData: FormData) {
  const days = formData.getAll("itin_day").map(String);
  const titles = formData.getAll("itin_title").map(String);
  const details = formData.getAll("itin_detail").map(String);
  const rows: { order: number; day: string; title: string; detail: string }[] = [];
  for (let i = 0; i < days.length; i++) {
    const day = days[i]?.trim();
    const title = titles[i]?.trim();
    if (!day && !title) continue;
    rows.push({ order: rows.length, day: day ?? "", title: title ?? "", detail: details[i]?.trim() ?? "" });
  }
  return rows;
}

export async function createExpedition(_state: AdminState, formData: FormData): Promise<AdminState> {
  await assertAdmin();
  const data = parseExpeditionForm(formData);
  if (!data.slug || !data.name) return { error: "Slug and name are required." };

  const exists = await prisma.expedition.findUnique({ where: { slug: data.slug } });
  if (exists) return { error: "An expedition with that slug already exists." };

  const itinerary = parseItinerary(formData);
  await prisma.expedition.create({
    data: { ...data, itinerary: { create: itinerary } },
  });

  revalidatePath("/admin/expeditions");
  revalidatePath("/treks");
  revalidatePath("/mountaineering");
  redirect("/admin/expeditions");
}

export async function updateExpedition(id: string, _state: AdminState, formData: FormData): Promise<AdminState> {
  await assertAdmin();
  const data = parseExpeditionForm(formData);
  if (!data.slug || !data.name) return { error: "Slug and name are required." };

  // Slug uniqueness (excluding this record).
  const clash = await prisma.expedition.findFirst({ where: { slug: data.slug, NOT: { id } } });
  if (clash) return { error: "Another expedition already uses that slug." };

  const itinerary = parseItinerary(formData);
  await prisma.$transaction([
    prisma.expedition.update({ where: { id }, data }),
    prisma.itineraryDay.deleteMany({ where: { expeditionId: id } }),
    prisma.itineraryDay.createMany({ data: itinerary.map((r) => ({ ...r, expeditionId: id })) }),
  ]);

  revalidatePath("/admin/expeditions");
  revalidatePath(`/${data.kind === "PEAK" ? "mountaineering" : "treks"}/${data.slug}`);
  revalidatePath("/treks");
  revalidatePath("/mountaineering");
  redirect("/admin/expeditions");
}

export async function deleteExpedition(id: string): Promise<void> {
  await assertAdmin();
  // Block delete if bookings reference it (FK is Restrict).
  const count = await prisma.booking.count({ where: { expeditionId: id } });
  if (count > 0) {
    // Soft-hide instead.
    await prisma.expedition.update({ where: { id }, data: { published: false } });
  } else {
    await prisma.expedition.delete({ where: { id } });
  }
  revalidatePath("/admin/expeditions");
  revalidatePath("/treks");
  revalidatePath("/mountaineering");
}

export async function setBookingStatus(
  id: string,
  status: "PENDING" | "AWAITING_VERIFICATION" | "CONFIRMED" | "CANCELLED",
): Promise<void> {
  await assertAdmin();
  await prisma.booking.update({
    where: { id },
    data: { status, paidAt: status === "CONFIRMED" ? new Date() : null },
  });
  revalidatePath("/admin/bookings");
}

export async function setUserRole(id: string, role: "USER" | "ADMIN"): Promise<{ ok: boolean; error?: string }> {
  const me = await assertAdmin();
  if (id === me.id && role === "USER") {
    return { ok: false, error: "You can't remove your own admin role." };
  }
  if (role === "USER") {
    // Don't allow removing the last admin.
    const admins = await prisma.user.count({ where: { role: "ADMIN" } });
    const target = await prisma.user.findUnique({ where: { id }, select: { role: true } });
    if (target?.role === "ADMIN" && admins <= 1) {
      return { ok: false, error: "There must be at least one admin." };
    }
  }
  await prisma.user.update({ where: { id }, data: { role } });
  revalidatePath("/admin/users");
  return { ok: true };
}
