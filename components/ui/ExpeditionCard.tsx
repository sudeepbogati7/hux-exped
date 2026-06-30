import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, CalendarIcon, GaugeIcon, StarIcon } from "@/components/ui/icons";
import type { Trek } from "@/lib/data";

export const expeditionHref = (e: Trek) =>
  `/${e.kind === "peak" ? "mountaineering" : "treks"}/${e.slug}`;

/** Trek/peak card — image + all-inclusive pill, facts row, price & view link. */
export default function ExpeditionCard({ item }: { item: Trek }) {
  const priceUSD = parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0;

  return (
    <Link
      href={expeditionHref(item)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,20,20,0.55)]"
    >
      {/* image */}
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Image
          src={item.hero || item.image}
          alt={`${item.name}, Nepal`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
        />
        <span className="absolute bottom-3 left-3 rounded-md bg-[#f5c451] px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.1em] text-ink shadow">
          All inclusive cost
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">{item.region}</p>
        <h3 className="display mt-1.5 text-2xl leading-tight text-ink transition-colors duration-300 group-hover:text-[#6b8e1f]">{item.name}</h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem] font-medium text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4 text-muted" /> {item.days}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GaugeIcon className="h-4 w-4 text-muted" /> {item.grade}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <StarIcon className="h-4 w-4 text-[#6b8e1f]" /> 5.0
          </span>
        </div>

        <div className="mt-auto border-t border-dashed border-line pt-4 sm:pt-5">
          <div className="flex items-end justify-between">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">from</span>
            <div className="display text-2xl text-ink">USD {priceUSD.toLocaleString("en-US")}</div>
          </div>
          <span className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-coral px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-300 group-hover:bg-coral-dark group-hover:gap-3">
            View trip
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
