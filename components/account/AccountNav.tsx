"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const items = [
  { href: "/account", label: "Overview" },
  { href: "/account/bookings", label: "My bookings" },
  { href: "/account/profile", label: "Profile" },
];

export default function AccountNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
      {items.map((it) => {
        const active = pathname === it.href;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              active ? "bg-ink text-cream" : "text-ink-soft hover:bg-ink/5 hover:text-ink"
            }`}
          >
            {it.label}
          </Link>
        );
      })}
      {isAdmin && (
        <Link
          href="/admin"
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6b8e1f] transition-colors hover:bg-ink/5"
        >
          Admin panel
        </Link>
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-1 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
      >
        Log out
      </button>
    </nav>
  );
}
