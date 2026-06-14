import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";
import { ArrowIcon, MountainIcon } from "@/components/ui/icons";
import { photos } from "@/lib/data";

const stats = [
  { value: 10, suffix: " max", label: "Trekkers per group" },
  { value: 19, suffix: "+", label: "Years on the trail" },
  { value: 5, suffix: "%", label: "To Nepal schools" },
];

/**
 * Variation B intro — light editorial counterpart to the cinematic hero.
 * Two columns: positioning + animated stats on the left, framed photo right.
 */
export default function Manifesto() {
  return (
    <section className="paper py-24 sm:py-32 lg:py-36">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* copy */}
        <Reveal variant="up">
          <p className="eyebrow mb-5 inline-flex items-center gap-2">
            <MountainIcon className="h-4 w-4 text-coral" /> The HUX difference
          </p>
          <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">
            Skip the queues.
            <br />
            Find the <span className="text-coral">silence.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink">
            While everyone files toward Everest Base Camp, we head the other way
            — into restricted valleys, over forgotten passes and through villages
            that still run on yak time. Small groups, local guides, the real
            Nepal.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>

          <Link
            href="#why"
            className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink"
          >
            <span className="ulink">See how we&apos;re different</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon className="h-4 w-4" />
            </span>
          </Link>
        </Reveal>

        {/* image */}
        <Reveal variant="mask" className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-deep">
            <Image
              src={photos.nepal}
              alt="Deep in the restricted Nepal Himalaya"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
              Restricted · Real Nepal
            </span>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-ink/85 p-6 text-cream backdrop-blur">
              <p className="text-sm leading-relaxed">
                Far from Everest Base Camp and the Annapurna crowds — the
                mountains the guidebooks forgot.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
