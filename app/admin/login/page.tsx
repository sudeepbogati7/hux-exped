import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminLogin from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "Admin sign in — HUX EXPED",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  // Already an admin? Skip the form.
  const session = await auth();
  if (session?.user?.role === "ADMIN") redirect("/admin");

  return <AdminLogin />;
}
