import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, ClockIcon, MountainIcon, GaugeIcon, MapPinIcon } from "@/components/ui/icons";
import type { Trek } from "@/lib/data";

export const expeditionHref = (e: Trek) =>
  `/${e.kind === "peak" ? "mountaineering" : "treks"}/${e.slug}`;

function Fact({ icon: Icon, value }: { icon: typeof ClockIcon; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-cream/75">
      <Icon className="h-3.5 w-3.5 text-coral" />
      {value}
    </span>
  );
}

/** Image-led card for a trek or peak. Grayscale → colour on hover. */
export default function ExpeditionCard({ item }: { item: Trek }) {
  return (
    <Link href={expeditionHref(item)} className="group relative block overflow-hidden rounded-2xl bg-ink">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={item.image}
          alt={`${item.name}, Nepal`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover grayscale transition-all duration-700 ease-out-expo group-hover:scale-[1.05] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
          {item.meta}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/70">
            <MapPinIcon className="h-3.5 w-3.5 text-coral" /> {item.region}
          </p>
          <h3 className="display mt-2 text-3xl text-cream">{item.name}</h3>
          <p className="mt-2 line-clamp-2 max-w-sm text-[0.86rem] leading-relaxed text-cream/70">
            {item.tagline}.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-cream/15 pt-4">
            <Fact icon={ClockIcon} value={item.days} />
            <Fact icon={MountainIcon} value={item.altitude} />
            <Fact icon={GaugeIcon} value={item.grade} />
          </div>

          <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream">
            <span className="ulink decoration-cream/40">View {item.kind === "peak" ? "expedition" : "trek"}</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-coral transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
