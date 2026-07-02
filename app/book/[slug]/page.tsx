import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import AppFooter from "@/components/layout/AppFooter";
import BookingStep from "@/components/booking/BookingStep";
import BookingSummary from "@/components/booking/BookingSummary";
import { ArrowIcon } from "@/components/ui/icons";
import { requireUser } from "@/lib/auth";
import { getExpeditionBySlug, getAllExpeditionSlugs } from "@/lib/expeditions";
import { departures } from "@/lib/data";

export async function generateStaticParams() {
  const slugs = await getAllExpeditionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = await getExpeditionBySlug(slug);
  return { title: e ? `Book ${e.name} — HUX EXPED` : "Book — HUX EXPED" };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = await getExpeditionBySlug(slug);
  if (!trip) notFound();

  // Real auth gate (proxy is optimistic only).
  await requireUser(`/book/${slug}`);

  const price = trip.priceUSD;
  const detailHref = `/${trip.kind === "peak" ? "mountaineering" : "treks"}/${trip.slug}`;
  const dates = departures(trip.slug);

  return (
    <>
      <Navbar subpage />
      <main className="paper pt-20">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <Link href={detailHref} className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-[#1f6f96]">
              <ArrowIcon className="h-4 w-4 rotate-180" /> Back to trip
            </Link>
            <h1 className="display mt-5 text-4xl text-ink sm:text-5xl">Secure your spot</h1>
            <p className="mt-3 max-w-xl text-ink-soft">
              Reserve {trip.name} — pick your group size and departure, then confirm with payment.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
              <div className="order-2 lg:order-1">
                <BookingStep slug={trip.slug} priceUSD={price} departures={dates} />
              </div>
              <aside className="order-1 lg:order-2">
                <BookingSummary
                  image={trip.image}
                  meta={trip.meta}
                  region={trip.region}
                  name={trip.name}
                  days={trip.days}
                  altitude={trip.altitude}
                  price={price}
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
