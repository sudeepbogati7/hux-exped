import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PaymentForm from "@/components/booking/PaymentForm";
import { ArrowIcon, ClockIcon, MountainIcon, CheckIcon } from "@/components/ui/icons";
import { getExpedition, allExpeditions } from "@/lib/data";

export function generateStaticParams() {
  return allExpeditions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getExpedition(slug);
  return { title: e ? `Book ${e.name} — HUX EXPED` : "Book — HUX EXPED" };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getExpedition(slug);
  if (!trip) notFound();

  const price = parseInt(trip.price.replace(/[^\d]/g, ""), 10) || 0;
  const deposit = Math.round(price * 0.2);
  const detailHref = `/${trip.kind === "peak" ? "mountaineering" : "treks"}/${trip.slug}`;

  return (
    <>
      <Navbar subpage />
      <main className="paper pt-20">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <Link href={detailHref} className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-coral">
              <ArrowIcon className="h-4 w-4 rotate-180" /> Back to trip
            </Link>
            <h1 className="display mt-5 text-4xl text-ink sm:text-5xl">Secure your spot</h1>
            <p className="mt-3 max-w-xl text-ink-soft">
              Reserve {trip.name} with a deposit, or pay in full — flexible,
              secure and confirmed instantly.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
              {/* payment form */}
              <div className="order-2 lg:order-1">
                <PaymentForm total={price} slug={trip.slug} />
              </div>

              {/* order summary */}
              <aside className="order-1 lg:order-2">
                <div className="lg:sticky lg:top-24">
                  <div className="overflow-hidden rounded-2xl border border-line bg-cream">
                    <div className="relative aspect-[16/9] w-full">
                      <Image src={trip.image} alt={trip.name} fill sizes="420px" className="object-cover" />
                      <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
                        {trip.meta}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="eyebrow">{trip.region}</p>
                      <h2 className="display mt-1 text-2xl text-ink">{trip.name}</h2>
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                        <span className="inline-flex items-center gap-1.5"><ClockIcon className="h-4 w-4 text-coral" /> {trip.days}</span>
                        <span className="inline-flex items-center gap-1.5"><MountainIcon className="h-4 w-4 text-coral" /> {trip.altitude}</span>
                      </div>

                      <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-ink-soft">Trip price · per person</dt>
                          <dd className="font-semibold text-ink">USD {price.toLocaleString("en-US")}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-ink-soft">Permits &amp; taxes</dt>
                          <dd className="font-semibold text-ink">Included</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-ink-soft">Travellers</dt>
                          <dd className="font-semibold text-ink">1</dd>
                        </div>
                        <div className="flex items-end justify-between border-t border-line pt-4">
                          <dt className="display text-lg text-ink">Total due</dt>
                          <dd className="display text-2xl text-ink">USD {price.toLocaleString("en-US")}</dd>
                        </div>
                        <p className="flex items-center gap-2 text-[0.78rem] text-muted">
                          <CheckIcon className="h-3.5 w-3.5 text-coral" /> Or reserve with a USD {deposit.toLocaleString("en-US")} deposit
                        </p>
                      </dl>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-[0.72rem] text-muted">
                    Free cancellation up to 60 days before departure.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
