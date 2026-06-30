"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { registerSchema, credentialsSchema } from "@/lib/validation";

export type AuthState =
  | {
      errors?: { name?: string[]; email?: string[]; password?: string[] };
      message?: string;
    }
  | undefined;

/** Register a new email/password user, then sign them in. */
export async function register(_state: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { errors: { email: ["An account with this email already exists."] } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Promote the configured admin email on creation.
  const isAdmin =
    !!process.env.ADMIN_EMAIL && email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();

  await prisma.user.create({
    data: { name, email, passwordHash, role: isAdmin ? "ADMIN" : "USER" },
  });

  // signIn throws a NEXT_REDIRECT error on success — let it propagate. Only
  // surface genuine auth failures.
  try {
    await signIn("credentials", { email, password, redirectTo: "/account" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Account created, but sign-in failed. Please log in." };
    }
    throw error;
  }
  return undefined;
}

/** Authenticate an existing email/password user. */
export async function authenticate(_state: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const callbackUrl = (formData.get("callbackUrl") as string) || "/account";

  try {
    await signIn("credentials", { ...parsed.data, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Invalid email or password." };
    }
    throw error;
  }
  return undefined;
}

/** Authenticate, but only allow ADMINs through (dedicated /admin/login). */
export async function authenticateAdmin(_state: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  // Pre-check the role so non-admins get a clear message and never get a session.
  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { role: true, passwordHash: true },
  });
  if (!user?.passwordHash) {
    return { message: "Invalid email or password." };
  }
  if (user.role !== "ADMIN") {
    return { message: "This account doesn't have admin access." };
  }

  try {
    await signIn("credentials", { ...parsed.data, redirectTo: "/admin" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Invalid email or password." };
    }
    throw error;
  }
  return undefined;
}

/** Sign out and return to the home page. */
export async function logout() {
  await signOut({ redirectTo: "/" });
}
