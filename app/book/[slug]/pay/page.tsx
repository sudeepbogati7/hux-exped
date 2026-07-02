import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import AppFooter from "@/components/layout/AppFooter";
import PaymentPanel from "@/components/booking/PaymentPanel";
import BookingSummary from "@/components/booking/BookingSummary";
import { ArrowIcon } from "@/components/ui/icons";
import { requireUser } from "@/lib/auth";
import { getExpeditionBySlug } from "@/lib/expeditions";
import { prisma } from "@/lib/prisma";
import { stripeEnabled } from "@/lib/stripe";
import { bankDetails } from "@/lib/data";

export const metadata: Metadata = { title: "Payment — HUX EXPED" };

export default async function PayPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ b?: string; canceled?: string }>;
}) {
  const { slug } = await params;
  const { b: bookingId, canceled } = await searchParams;
  const user = await requireUser(`/book/${slug}`);

  const trip = await getExpeditionBySlug(slug);
  if (!trip) notFound();

  // Booking must exist, belong to this user, and match the slug.
  if (!bookingId) redirect(`/book/${slug}`);
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { id: true, userId: true, travellers: true, totalUSD: true, departureDate: true, expedition: { select: { slug: true } } },
  });
  if (!booking || booking.userId !== user.id || booking.expedition.slug !== slug) {
    redirect(`/book/${slug}`);
  }

  return (
    <>
      <Navbar subpage />
      <main className="paper pt-20">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <Link href={`/book/${slug}`} className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-[#1f6f96]">
              <ArrowIcon className="h-4 w-4 rotate-180" /> Back to trip details
            </Link>
            <h1 className="display mt-5 text-4xl text-ink sm:text-5xl">Payment</h1>
            <p className="mt-3 max-w-xl text-ink-soft">
              {booking.travellers} {booking.travellers === 1 ? "traveller" : "travellers"} · departing {booking.departureDate}. Pay in full to confirm.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
              <div className="order-2 lg:order-1">
                <PaymentPanel
                  bookingId={booking.id}
                  slug={trip.slug}
                  total={booking.totalUSD}
                  stripeEnabled={stripeEnabled}
                  bank={bankDetails}
                  canceled={!!canceled}
                />
              </div>
              <aside className="order-1 lg:order-2">
                <BookingSummary
                  image={trip.image}
                  meta={trip.meta}
                  region={trip.region}
                  name={trip.name}
                  days={trip.days}
                  altitude={trip.altitude}
                  price={trip.priceUSD}
                  travellers={booking.travellers}
                  total={booking.totalUSD}
                />
              </aside>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
