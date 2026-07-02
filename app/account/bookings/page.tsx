import Link from "next/link";
import Image from "next/image";
import { ArrowIcon } from "@/components/ui/icons";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CancelBookingButton from "@/components/account/CancelBookingButton";
import StatusPill from "@/components/ui/StatusPill";

export const metadata = { title: "My bookings — HUX EXPED" };

export default async function BookingsPage() {
  const user = await requireUser("/account/bookings");

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      status: true,
      travellers: true,
      departureDate: true,
      totalUSD: true,
      createdAt: true,
      paymentMethod: true,
      expedition: { select: { name: true, slug: true, kind: true, image: true, region: true } },
    },
  });

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-cream p-12 text-center">
        <p className="display text-2xl text-ink">No bookings yet.</p>
        <p className="mt-2 text-ink-soft">When you reserve a trek or peak, it&apos;ll show up here.</p>
        <Link
          href="/treks"
          className="group mt-6 inline-flex items-center gap-3 rounded-full bg-coral px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark"
        >
          Browse treks
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((b) => {
        const detailHref = `/${b.expedition.kind === "PEAK" ? "mountaineering" : "treks"}/${b.expedition.slug}`;
        return (
          <div key={b.id} className="flex flex-col gap-4 rounded-2xl border border-line bg-cream p-4 sm:flex-row sm:p-5">
            <Link href={detailHref} className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-square sm:w-32">
              <Image src={b.expedition.image} alt={b.expedition.name} fill sizes="160px" className="object-cover" />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">{b.expedition.region}</p>
                  <Link href={detailHref} className="display text-xl text-ink hover:text-[#1f6f96]">
                    {b.expedition.name}
                  </Link>
                </div>
                <StatusPill status={b.status} />
              </div>

              <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-soft">
                <div><dt className="inline text-muted">Departure: </dt><dd className="inline font-semibold text-ink">{b.departureDate}</dd></div>
                <div><dt className="inline text-muted">Travellers: </dt><dd className="inline font-semibold text-ink">{b.travellers}</dd></div>
                <div><dt className="inline text-muted">Total: </dt><dd className="inline font-semibold text-ink">USD {b.totalUSD.toLocaleString("en-US")}</dd></div>
                {b.paymentMethod && (
                  <div><dt className="inline text-muted">Paid via: </dt><dd className="inline font-semibold text-ink">{b.paymentMethod === "STRIPE" ? "Card" : "Bank transfer"}</dd></div>
                )}
              </dl>

              {b.status === "AWAITING_VERIFICATION" && (
                <p className="mt-3 rounded-lg bg-coral/10 px-3 py-2 text-[0.78rem] text-accent-ink">
                  We&apos;ve received your transfer proof — we&apos;ll confirm your booking once it&apos;s verified.
                </p>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                {b.status === "PENDING" && (
                  <Link href={`/book/${b.expedition.slug}/pay?b=${b.id}`} className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent-ink hover:underline">
                    Complete payment
                  </Link>
                )}
                {b.status !== "CANCELLED" && b.status !== "CONFIRMED" && <CancelBookingButton id={b.id} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
