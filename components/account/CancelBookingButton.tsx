"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cancelBooking } from "@/app/actions/booking";

export default function CancelBookingButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      disabled={pending}
      onClick={() => {
        if (!confirm("Cancel this booking? This can't be undone.")) return;
        startTransition(async () => {
          await cancelBooking(id);
          router.refresh();
        });
      }}
      className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-red-600 disabled:opacity-50"
    >
      {pending ? "Cancelling…" : "Cancel booking"}
    </button>
  );
}
