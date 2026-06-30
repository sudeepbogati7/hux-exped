"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/expeditions", label: "Treks & peaks" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row gap-1 overflow-x-auto p-4 lg:flex-col lg:overflow-visible">
      {items.map((it) => {
        const active = it.href === "/admin" ? pathname === "/admin" : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              active ? "bg-coral text-ink" : "text-cream/75 hover:bg-white/[0.07] hover:text-cream"
            }`}
          >
            {it.label}
          </Link>
        );
      })}
      <Link
        href="/"
        className="shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold text-cream/50 transition-colors hover:bg-white/[0.07] hover:text-cream lg:mt-2"
      >
        ← Back to site
      </Link>
    </nav>
  );
}
