import type { Metadata } from "next";
import AuthView from "@/components/auth/AuthView";

export const metadata: Metadata = {
  title: "Log in — HUX EXPED",
  description: "Log in to manage your HUX EXPED expeditions and bookings.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  return <AuthView mode="login" callbackUrl={callbackUrl} />;
}
