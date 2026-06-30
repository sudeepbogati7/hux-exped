"use client";

import { signOut } from "next-auth/react";

export default function AdminUserBadge({ name, email }: { name: string; email: string }) {
  return (
    <div>
      <p className="truncate text-sm font-semibold text-cream">{name}</p>
      <p className="truncate text-[0.74rem] text-cream/50">{email}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-3 w-full rounded-xl border border-white/15 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cream/80 transition-colors hover:bg-white/[0.07] hover:text-cream"
      >
        Log out
      </button>
    </div>
  );
}
