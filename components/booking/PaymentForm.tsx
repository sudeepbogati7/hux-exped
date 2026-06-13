"use client";

import { useState } from "react";
import Link from "next/link";
import { LockIcon, CreditCardIcon, CheckIcon, ArrowIcon } from "@/components/ui/icons";

export default function PaymentForm({ total, slug }: { total: number; slug: string }) {
  const [paid, setPaid] = useState(false);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");

  const field =
    "w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";
  const label = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";

  const fmtCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  if (paid) {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl border border-line bg-cream p-8 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-coral text-cream">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="display mt-6 text-3xl text-ink">Payment successful</h2>
        <p className="mt-3 max-w-xs text-sm text-ink-soft">
          This is a frontend demo — no card was charged. Stripe will be wired in
          for live bookings.
        </p>
        <Link href={`/treks/${slug}`} className="mt-7 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-coral">
          Back to the trip
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setPaid(true);
      }}
      className="rounded-2xl border border-line bg-cream p-6 sm:p-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="display text-2xl text-ink">Payment details</h2>
        <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
          <LockIcon className="h-3.5 w-3.5" /> Secure
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className={label}>Email</span>
          <input required type="email" className={field} placeholder="you@email.com" />
        </label>

        <label className="block">
          <span className={label}>Card number</span>
          <div className="relative">
            <input
              required
              inputMode="numeric"
              value={card}
              onChange={(e) => setCard(fmtCard(e.target.value))}
              className={`${field} pr-11`}
              placeholder="4242 4242 4242 4242"
            />
            <CreditCardIcon className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          </div>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className={label}>Expiry</span>
            <input required value={exp} onChange={(e) => setExp(fmtExp(e.target.value))} className={field} placeholder="MM/YY" inputMode="numeric" />
          </label>
          <label className="block">
            <span className={label}>CVC</span>
            <input required value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} className={field} placeholder="123" inputMode="numeric" />
          </label>
        </div>

        <label className="block">
          <span className={label}>Name on card</span>
          <input required className={field} placeholder="Full name" autoComplete="cc-name" />
        </label>

        <label className="block">
          <span className={label}>Country</span>
          <select className={`${field} appearance-none`} defaultValue="">
            <option value="" disabled>Select country</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>Canada</option>
            <option>Nepal</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark"
      >
        Pay USD {total.toLocaleString("en-US")}
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="mt-4 flex items-center justify-center gap-2 text-[0.72rem] text-muted">
        <LockIcon className="h-3.5 w-3.5" /> Payments secured by Stripe · demo, no real charge
      </p>
    </form>
  );
}
