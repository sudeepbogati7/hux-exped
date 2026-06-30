"use client";

import { useActionState, useMemo, useState } from "react";
import { ArrowIcon, ChevronDown } from "@/components/ui/icons";
import { createBooking, type BookingState } from "@/app/actions/booking";

type Departure = { date: string; spots: number; status: string };

export default function BookingStep({
  slug,
  priceUSD,
  departures,
}: {
  slug: string;
  priceUSD: number;
  departures: Departure[];
}) {
  const [state, formAction, pending] = useActionState<BookingState, FormData>(createBooking, undefined);
  const [travellers, setTravellers] = useState(1);
  const [date, setDate] = useState(departures[0]?.date ?? "");

  const total = useMemo(() => priceUSD * travellers, [priceUSD, travellers]);

  const field =
    "w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";
  const label = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-cream p-6 sm:p-8">
      <h2 className="display text-2xl text-ink">Trip details</h2>
      <p className="mt-2 text-sm text-ink-soft">Choose your group size and a departure to reserve your spot.</p>

      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="travellers" value={travellers} />
      <input type="hidden" name="departureDate" value={date} />

      {state?.error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </div>
      )}

      <div className="mt-6 space-y-5">
        {/* travellers stepper */}
        <div>
          <span className={label}>Travellers</span>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-line">
              <button
                type="button"
                onClick={() => setTravellers((n) => Math.max(1, n - 1))}
                className="grid h-11 w-11 place-items-center text-xl text-ink transition-colors hover:text-[#6b8e1f] disabled:opacity-30"
                disabled={travellers <= 1}
                aria-label="Fewer travellers"
              >
                −
              </button>
              <span className="display w-12 text-center text-xl text-ink">{travellers}</span>
              <button
                type="button"
                onClick={() => setTravellers((n) => Math.min(10, n + 1))}
                className="grid h-11 w-11 place-items-center text-xl text-ink transition-colors hover:text-[#6b8e1f] disabled:opacity-30"
                disabled={travellers >= 10}
                aria-label="More travellers"
              >
                +
              </button>
            </div>
            <span className="text-sm text-muted">Max 10 per departure</span>
          </div>
        </div>

        {/* departure date */}
        <div>
          <span className={label}>Departure date</span>
          <div className="relative">
            <select value={date} onChange={(e) => setDate(e.target.value)} className={`${field} appearance-none pr-10`}>
              {departures.map((d) => (
                <option key={d.date} value={d.date}>
                  {d.date} — {d.status} ({d.spots} spots left)
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </div>

        {/* note */}
        <div>
          <span className={label}>Anything we should know? (optional)</span>
          <textarea name="note" rows={3} className={`${field} resize-none`} placeholder="Dietary needs, experience, special requests…" />
        </div>
      </div>

      {/* total + submit */}
      <div className="mt-7 flex items-end justify-between border-t border-line pt-5">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">Total</span>
        <span className="display text-3xl text-ink">USD {total.toLocaleString("en-US")}</span>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Reserving…" : "Continue to payment"}
        {!pending && <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </button>
    </form>
  );
}
