"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CreditCard, Landmark, Loader2, Copy, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { startStripeCheckout, submitBankTransfer } from "@/app/actions/booking";
import ImageUpload from "@/components/admin/ImageUpload";

type Bank = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swift: string;
  branch: string;
  currencyNote: string;
};

export default function PaymentPanel({
  bookingId,
  slug,
  total,
  stripeEnabled,
  bank,
  canceled,
}: {
  bookingId: string;
  slug: string;
  total: number;
  stripeEnabled: boolean;
  bank: Bank;
  canceled?: boolean;
}) {
  const [method, setMethod] = useState<"stripe" | "bank">(stripeEnabled ? "stripe" : "bank");

  return (
    <div className="rounded-2xl border border-line bg-cream p-6 sm:p-8">
      <h2 className="display text-2xl text-ink">Choose how to pay</h2>
      <p className="mt-2 text-sm text-ink-soft">Pay by card, or transfer to our bank and upload the receipt.</p>

      {canceled && (
        <div className="mt-4 rounded-xl border border-[color:var(--color-saffron)]/40 bg-[color:var(--color-saffron)]/10 px-4 py-3 text-sm font-medium text-[#a9781a]">
          Card payment was canceled — you can try again or switch to bank transfer.
        </div>
      )}

      {/* method tabs */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <MethodTab
          active={method === "stripe"}
          onClick={() => setMethod("stripe")}
          icon={CreditCard}
          title="Card"
          sub="Visa, Mastercard · instant"
        />
        <MethodTab
          active={method === "bank"}
          onClick={() => setMethod("bank")}
          icon={Landmark}
          title="Bank transfer"
          sub="Upload proof · verified by us"
        />
      </div>

      <div className="mt-6">
        {method === "stripe" ? (
          <StripePay bookingId={bookingId} total={total} enabled={stripeEnabled} onSwitch={() => setMethod("bank")} />
        ) : (
          <BankPay bookingId={bookingId} slug={slug} bank={bank} />
        )}
      </div>
    </div>
  );
}

function MethodTab({
  active,
  onClick,
  icon: Icon,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof CreditCard;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
        active ? "border-coral bg-coral/10" : "border-line bg-cream hover:border-coral/50"
      }`}
    >
      <Icon className={`size-5 shrink-0 ${active ? "text-coral" : "text-muted"}`} />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="block text-[0.72rem] text-muted">{sub}</span>
      </span>
    </button>
  );
}

function StripePay({ bookingId, total, enabled, onSwitch }: { bookingId: string; total: number; enabled: boolean; onSwitch: () => void }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  if (!enabled) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-cream-deep p-6 text-center">
        <p className="text-sm text-ink-soft">Card payments aren&apos;t configured on this environment yet.</p>
        <button onClick={onSwitch} className="mt-3 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-coral hover:underline">
          Pay by bank transfer instead →
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 rounded-xl border border-line bg-cream-deep px-4 py-3 text-[0.78rem] text-ink-soft">
        <ShieldCheck className="size-4 text-coral" /> Secure checkout powered by Stripe. Test card: 4242 4242 4242 4242.
      </div>
      {error && <p className="mt-3 text-sm font-medium text-danger">{error}</p>}
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            setError("");
            const res = await startStripeCheckout(bookingId);
            if (res?.error) setError(res.error);
          })
        }
        className="group mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <CreditCard className="size-4" />}
        {pending ? "Redirecting…" : `Pay USD ${total.toLocaleString("en-US")} by card`}
      </button>
    </div>
  );
}

function BankPay({ bookingId, slug, bank }: { bookingId: string; slug: string; bank: Bank }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState("");
  const [proof, setProof] = useState("");

  const copy = (label: string, value: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    });
  };

  const rows: [string, string][] = [
    ["Bank", bank.bankName],
    ["Account name", bank.accountName],
    ["Account number", bank.accountNumber],
    ["SWIFT / BIC", bank.swift],
    ["Branch", bank.branch],
  ];

  if (done) {
    return (
      <div className="rounded-xl border border-line bg-cream-deep p-6 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-coral text-cream">
          <Check className="size-7" />
        </span>
        <h3 className="display mt-4 text-2xl text-ink">Proof submitted</h3>
        <p className="mt-2 text-sm text-ink-soft">
          We&apos;ve received your transfer proof. Our team will verify it and confirm your booking — you&apos;ll see the status update in your account.
        </p>
        <div className="mt-5 flex items-center justify-center gap-5">
          <Link href="/account/bookings" className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-coral hover:underline">View my bookings</Link>
          <Link href={`/treks/${slug}`} className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink">Back to the trip</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* bank details */}
      <div className="rounded-xl border border-line">
        <div className="border-b border-line px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
          Transfer to this account
        </div>
        <dl className="divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <dt className="text-[0.78rem] text-muted">{k}</dt>
              <dd className="flex items-center gap-2 text-sm font-semibold text-ink">
                {v}
                <button type="button" onClick={() => copy(k, v)} className="text-muted transition-colors hover:text-coral" aria-label={`Copy ${k}`}>
                  {copied === k ? <Check className="size-3.5 text-coral" /> : <Copy className="size-3.5" />}
                </button>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="text-[0.78rem] leading-relaxed text-ink-soft">{bank.currencyNote}</p>

      {/* proof upload */}
      <div className="rounded-xl border border-line p-4">
        <ImageUpload
          name="proof"
          label="Upload payment proof (screenshot / receipt)"
          endpoint="/api/upload"
          initialUrl={proof}
          onChange={setProof}
        />
      </div>

      {error && <p className="text-sm font-medium text-danger">{error}</p>}

      <button
        type="button"
        disabled={pending || !proof}
        onClick={() =>
          startTransition(async () => {
            setError("");
            const res = await submitBankTransfer(bookingId, proof);
            if (res?.error) setError(res.error);
            else setDone(true);
          })
        }
        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        {pending ? "Submitting…" : "Submit transfer proof"}
      </button>
      {!proof && <p className="text-center text-[0.72rem] text-muted">Upload your receipt to enable submission.</p>}
    </div>
  );
}
