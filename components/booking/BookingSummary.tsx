import Image from "next/image";
import { ClockIcon, MountainIcon, CheckIcon } from "@/components/ui/icons";

/** Sticky order-summary card shared by the booking and payment steps. */
export default function BookingSummary({
  image,
  meta,
  region,
  name,
  days,
  altitude,
  price,
  travellers,
  total,
}: {
  image: string;
  meta: string;
  region: string;
  name: string;
  days: string;
  altitude: string;
  price: number;
  travellers?: number;
  total?: number;
}) {
  const deposit = Math.round((total ?? price) * 0.2);
  return (
    <div className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-2xl border border-line bg-cream">
        <div className="relative aspect-[16/9] w-full">
          <Image src={image} alt={name} fill sizes="420px" className="object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
            {meta}
          </span>
        </div>
        <div className="p-6">
          <p className="eyebrow">{region}</p>
          <h2 className="display mt-1 text-2xl text-ink">{name}</h2>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink-soft">
            <span className="inline-flex items-center gap-1.5"><ClockIcon className="h-4 w-4 text-[#6b8e1f]" /> {days}</span>
            <span className="inline-flex items-center gap-1.5"><MountainIcon className="h-4 w-4 text-[#6b8e1f]" /> {altitude}</span>
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
              <dd className="font-semibold text-ink">{travellers ?? 1}</dd>
            </div>
            <div className="flex items-end justify-between border-t border-line pt-4">
              <dt className="display text-lg text-ink">Total due</dt>
              <dd className="display text-2xl text-ink">USD {(total ?? price).toLocaleString("en-US")}</dd>
            </div>
            <p className="flex items-center gap-2 text-[0.78rem] text-muted">
              <CheckIcon className="h-3.5 w-3.5 text-[#6b8e1f]" /> Or reserve with a USD {deposit.toLocaleString("en-US")} deposit
            </p>
          </dl>
        </div>
      </div>
      <p className="mt-4 text-center text-[0.72rem] text-muted">
        Free cancellation up to 60 days before departure.
      </p>
    </div>
  );
}
