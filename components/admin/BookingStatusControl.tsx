"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { setBookingStatus } from "@/app/actions/admin";

const STATUSES = ["PENDING", "AWAITING_VERIFICATION", "CONFIRMED", "CANCELLED"] as const;
type Status = (typeof STATUSES)[number];
const LABEL: Record<Status, string> = {
  PENDING: "pending",
  AWAITING_VERIFICATION: "to verify",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
};

export default function BookingStatusControl({ id, status }: { id: string; status: Status }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const set = (next: Status) =>
    startTransition(async () => {
      await setBookingStatus(id, next);
      router.refresh();
    });

  return (
    <div className="flex flex-col items-start gap-1.5">
      {/* quick verify actions when a transfer is awaiting review */}
      {status === "AWAITING_VERIFICATION" && (
        <div className="flex gap-1.5">
          <button
            disabled={pending}
            onClick={() => set("CONFIRMED")}
            className="inline-flex items-center gap-1 rounded-lg bg-alpine px-2.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Check className="size-3" /> Confirm
          </button>
          <button
            disabled={pending}
            onClick={() => set("CANCELLED")}
            className="inline-flex items-center gap-1 rounded-lg bg-danger px-2.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <X className="size-3" /> Reject
          </button>
        </div>
      )}

      <select
        value={status}
        disabled={pending}
        onChange={(e) => set(e.target.value as Status)}
        className="rounded-lg border border-line bg-cream px-2.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink outline-none focus:border-ink disabled:opacity-50"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{LABEL[s]}</option>
        ))}
      </select>
    </div>
  );
}
