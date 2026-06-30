"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteExpedition } from "@/app/actions/admin";

export default function DeleteExpeditionButton({ id, name, hasBookings }: { id: string; name: string; hasBookings: boolean }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      disabled={pending}
      onClick={() => {
        const msg = hasBookings
          ? `"${name}" has bookings, so it will be hidden (not deleted). Continue?`
          : `Delete "${name}"? This can't be undone.`;
        if (!confirm(msg)) return;
        startTransition(async () => {
          await deleteExpedition(id);
          router.refresh();
        });
      }}
      className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-red-600 disabled:opacity-50"
    >
      {pending ? "…" : hasBookings ? "Hide" : "Delete"}
    </button>
  );
}
