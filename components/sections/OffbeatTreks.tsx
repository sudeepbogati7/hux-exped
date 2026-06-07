import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon, ClockIcon, MountainIcon, GaugeIcon, MapPinIcon } from "@/components/ui/icons";
import { featuredTreks, type Trek } from "@/lib/data";

function Fact({ icon: Icon, value }: { icon: typeof ClockIcon; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-cream/75">
      <Icon className="h-3.5 w-3.5 text-coral" />
      {value}
    </span>
  );
}

function Card({ trek }: { trek: Trek }) {
  return (
    <Link
      href={`/treks/${trek.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-ink"
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={trek.image}
          alt={`${trek.name}, Nepal`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover grayscale transition-all duration-700 ease-out-expo group-hover:scale-[1.05] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-transparent" />

        {/* meta chip */}
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
          {trek.meta}
        </span>

        {/* content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/70">
            <MapPinIcon className="h-3.5 w-3.5 text-coral" /> {trek.region}
          </p>
          <h3 className="display mt-2 text-3xl text-cream">{trek.name}</h3>
          <p className="mt-2 line-clamp-2 max-w-sm text-[0.86rem] leading-relaxed text-cream/70">
            {trek.tagline}.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-cream/15 pt-4">
            <Fact icon={ClockIcon} value={trek.days} />
            <Fact icon={MountainIcon} value={trek.altitude} />
            <Fact icon={GaugeIcon} value={trek.grade} />
          </div>

          <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream">
            <span className="ulink decoration-cream/40">View expedition</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-coral transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function OffbeatTreks() {
  return (
    <section id="treks" className="bg-cream-deep py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-end gap-8 border-b border-line pb-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal variant="up">
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <MountainIcon className="h-4 w-4 text-coral" /> Offbeat Nepal
            </p>
            <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">
              Trails the crowds
              <br />
              never <span className="text-coral">find</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-sm leading-relaxed text-ink-soft lg:pb-2">
              Restricted valleys, forbidden kingdoms and roadless wilderness —
              expeditions into the Nepal most travellers never see, far from
              Everest Base Camp and the Annapurna crowds.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTreks.map((trek, i) => (
            <Reveal key={trek.slug} variant="up" delay={(i % 3) * 0.08}>
              <Card trek={trek} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
