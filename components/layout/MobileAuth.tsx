"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

/** Session-aware auth block for the mobile slide-down menu. */
export default function MobileAuth({ onNavigate }: { onNavigate: () => void }) {
  const { data: session, status } = useSession();
  const link = "py-1 text-sm font-semibold text-ink-soft transition-colors hover:text-[#6b8e1f]";

  if (status === "authenticated" && session?.user) {
    const isAdmin = session.user.role === "ADMIN";
    return (
      <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {session.user.name || session.user.email}
        </p>
        <Link href="/account" onClick={onNavigate} className={link}>My account</Link>
        <Link href="/account/bookings" onClick={onNavigate} className={link}>My bookings</Link>
        {isAdmin && (
          <Link href="/admin" onClick={onNavigate} className="py-1 text-sm font-semibold text-[#6b8e1f]">
            Admin panel
          </Link>
        )}
        <button
          onClick={() => {
            onNavigate();
            signOut({ callbackUrl: "/" });
          }}
          className="mt-1 w-fit rounded-full border border-line px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ink"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      onClick={onNavigate}
      className="mt-4 w-fit rounded-full bg-ink px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream"
    >
      Login
    </Link>
  );
}
