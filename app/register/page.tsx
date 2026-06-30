import type { Metadata } from "next";
import AuthView from "@/components/auth/AuthView";

export const metadata: Metadata = {
  title: "Create account — HUX EXPED",
  description: "Create a HUX EXPED account and start planning your next expedition.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  return <AuthView mode="register" callbackUrl={callbackUrl} />;
}
