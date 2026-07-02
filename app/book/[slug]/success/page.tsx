import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AppFooter from "@/components/layout/AppFooter";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStripe, stripeEnabled } from "@/lib/stripe";

export const metadata: Metadata = { title: "Payment complete — HUX EXPED" };

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ b?: string }>;
}) {
  const { slug } = await params;
  const { b: bookingId } = await searchParams;
  const user = await requireUser(`/book/${slug}`);
  if (!bookingId) redirect(`/book/${slug}`);

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { id: true, userId: true, status: true, stripeSessionId: true, totalUSD: true, expedition: { select: { name: true } } },
  });
  if (!booking || booking.userId !== user.id) notFound();

  // Fallback: if the webhook hasn't confirmed yet, verify the session directly
  // so the success page is accurate even without a configured webhook (local dev).
  if (booking.status !== "CONFIRMED" && booking.stripeSessionId && stripeEnabled) {
    try {
      const s = await getStripe().checkout.sessions.retrieve(booking.stripeSessionId);
      if (s.payment_status === "paid") {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: "CONFIRMED", paidAt: new Date() },
        });
        booking.status = "CONFIRMED";
      }
    } catch {
      // ignore — webhook will reconcile
    }
  }

  const paid = booking.status === "CONFIRMED";

  return (
    <>
      <Navbar subpage />
      <main className="paper flex min-h-[70vh] items-center justify-center pt-20">
        <div className="mx-auto max-w-md px-5 py-16 text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-coral text-cream">
            <Check className="size-8" />
          </span>
          <h1 className="display mt-6 text-4xl text-ink">{paid ? "Payment complete" : "Payment received"}</h1>
          <p className="mt-3 text-ink-soft">
            {paid
              ? `Your ${booking.expedition.name} booking is confirmed. A receipt is on its way to your email.`
              : "We're confirming your payment — it'll show as confirmed in your account shortly."}
          </p>
          <div className="mt-8 flex items-center justify-center gap-5">
            <Link href="/account/bookings" className="rounded-full bg-ink px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral hover:text-cream">
              View my bookings
            </Link>
            <Link href={`/treks/${slug}`} className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-muted hover:text-ink">
              Back to the trip
            </Link>
          </div>
        </div>
      </main>
      <AppFooter />
    </>
  );
}
