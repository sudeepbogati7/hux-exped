"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setBookingStatus } from "@/app/actions/admin";

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED"] as const;

export default function BookingStatusControl({ id, status }: { id: string; status: (typeof STATUSES)[number] }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as (typeof STATUSES)[number];
        startTransition(async () => {
          await setBookingStatus(id, next);
          router.refresh();
        });
      }}
      className="rounded-lg border border-line bg-cream px-2.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink outline-none focus:border-ink disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s.toLowerCase()}</option>
      ))}
    </select>
  );
}
