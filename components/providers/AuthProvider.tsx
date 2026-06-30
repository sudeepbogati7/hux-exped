"use client";

import { SessionProvider } from "next-auth/react";

/** Client wrapper so Client Components can read the session via useSession(). */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
