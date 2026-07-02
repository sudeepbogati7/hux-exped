"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown } from "@/components/ui/icons";

/**
 * Session-aware account control for the desktop navbar.
 * - Logged out: a "Login" pill.
 * - Logged in: an avatar/name button opening a dropdown (account, bookings,
 *   admin if ADMIN, log out).
 * `onDark` matches the navbar's transparent-over-hero styling.
 */
export default function AccountMenu({ onDark }: { onDark: boolean }) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const loginPill = (
    <Link
      href="/login"
      className={`rounded-full px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
        onDark ? "bg-cream text-ink hover:bg-coral hover:text-ink" : "bg-ink text-cream hover:bg-coral hover:text-ink"
      }`}
    >
      Login
    </Link>
  );

  // While loading, keep layout stable by showing the login pill.
  if (status !== "authenticated" || !session?.user) return loginPill;

  const user = session.user;
  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const isAdmin = user.role === "ADMIN";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-[0.78rem] font-semibold transition-colors ${
          onDark ? "text-cream hover:bg-white/10" : "text-ink hover:bg-ink/5"
        }`}
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-[0.7rem] text-ink">{initials}</span>
        )}
        <span className="hidden max-w-[8rem] truncate normal-case sm:inline">{user.name || "Account"}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute right-0 top-full pt-3 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="w-60 rounded-2xl border border-white/10 bg-ink p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
          <div className="border-b border-white/10 px-3 pb-2.5 pt-1.5">
            <p className="truncate text-sm font-semibold text-cream">{user.name || "Trekker"}</p>
            <p className="truncate text-[0.74rem] text-cream/50">{user.email}</p>
          </div>
          <nav className="mt-1.5 grid gap-0.5">
            <Link href="/account" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-cream transition-colors hover:bg-white/[0.07] hover:text-[#3c9dcc]">
              My account
            </Link>
            <Link href="/account/bookings" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-cream transition-colors hover:bg-white/[0.07] hover:text-[#3c9dcc]">
              My bookings
            </Link>
            {isAdmin && (
              <Link href="/admin" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-[#3c9dcc] transition-colors hover:bg-white/[0.07]">
                Admin panel
              </Link>
            )}
          </nav>
          <div className="mt-1.5 border-t border-white/10 pt-1.5">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-cream/80 transition-colors hover:bg-white/[0.07] hover:text-cream"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
