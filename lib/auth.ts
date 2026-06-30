import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Data-access-layer auth helpers. Use these close to the data — in Server
 * Components, Server Actions and Route Handlers — not just in the proxy.
 */

/** Current session, or null. */
export async function getSession() {
  return auth();
}

/** Require a signed-in user; redirect to /login otherwise. Returns the user. */
export async function requireUser(callbackUrl?: string) {
  const session = await auth();
  if (!session?.user) {
    redirect(callbackUrl ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/login");
  }
  return session.user;
}

/** Require an ADMIN; send guests and non-admins to the dedicated admin login. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");
  return session.user;
}
