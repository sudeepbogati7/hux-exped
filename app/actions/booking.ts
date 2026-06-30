"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validation";

export type BookingState = { error?: string } | undefined;

/**
 * Create a booking for the signed-in user (status PENDING). Re-checks auth
 * server-side — never trust the proxy alone. Redirects to the payment step.
 */
export async function createBooking(_state: BookingState, formData: FormData): Promise<BookingState> {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/treks");
  }

  const parsed = bookingSchema.safeParse({
    slug: formData.get("slug"),
    travellers: formData.get("travellers"),
    departureDate: formData.get("departureDate"),
    note: formData.get("note") || undefined,
  });
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { error: first ?? "Please check your booking details." };
  }

  const { slug, travellers, departureDate, note } = parsed.data;

  const exp = await prisma.expedition.findFirst({
    where: { slug, published: true },
    select: { id: true, priceUSD: true },
  });
  if (!exp) return { error: "That expedition is no longer available." };

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      expeditionId: exp.id,
      travellers,
      departureDate,
      totalUSD: exp.priceUSD * travellers,
      status: "PENDING",
      note,
    },
    select: { id: true },
  });

  revalidatePath("/account/bookings");
  redirect(`/book/${slug}/pay?b=${booking.id}`);
}

/**
 * Mark a PENDING booking as CONFIRMED (after the mock payment). Ownership is
 * re-verified. Returns true on success.
 */
export async function confirmBooking(bookingId: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user) return false;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { userId: true, status: true },
  });
  if (!booking || booking.userId !== session.user.id) return false;

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED" },
  });
  revalidatePath("/account/bookings");
  return true;
}

/** Cancel a booking the user owns. */
export async function cancelBooking(bookingId: string): Promise<void> {
  const session = await auth();
  if (!session?.user) return;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { userId: true },
  });
  if (!booking || booking.userId !== session.user.id) return;

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });
  revalidatePath("/account/bookings");
}
