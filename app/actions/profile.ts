"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { profileSchema, passwordSchema } from "@/lib/validation";

export type ProfileState = { ok?: boolean; error?: string } | undefined;

/** Update the signed-in user's display name + avatar URL. */
export async function updateProfile(_state: ProfileState, formData: FormData): Promise<ProfileState> {
  const session = await auth();
  if (!session?.user) return { error: "You must be signed in." };

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    image: formData.get("image") || "",
  });
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { error: first ?? "Please check your details." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name, image: parsed.data.image || null },
  });

  revalidatePath("/account");
  return { ok: true };
}

/** Change the signed-in user's password (credentials accounts only). */
export async function changePassword(_state: ProfileState, formData: FormData): Promise<ProfileState> {
  const session = await auth();
  if (!session?.user) return { error: "You must be signed in." };

  const parsed = passwordSchema.safeParse({
    current: formData.get("current"),
    next: formData.get("next"),
  });
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { error: first ?? "Please check your details." };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true },
  });
  if (!user?.passwordHash) {
    return { error: "This account uses Google sign-in — no password to change." };
  }

  const ok = await bcrypt.compare(parsed.data.current, user.passwordHash);
  if (!ok) return { error: "Your current password is incorrect." };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: await bcrypt.hash(parsed.data.next, 10) },
  });

  return { ok: true };
}
