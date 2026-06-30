import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ExpeditionMarquee from "@/components/ui/ExpeditionMarquee";
import { MountainIcon, ArrowIcon } from "@/components/ui/icons";
import { photos } from "@/lib/data";
import { getPeaks } from "@/lib/expeditions";

export default async function Mountaineering() {
  const allPeaks = [...(await getPeaks("7000m")), ...(await getPeaks("6000m"))];
  return (
    <section id="mountaineering" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32 lg:py-36">
      <Image src={photos.nightSky} alt="" fill sizes="100vw" className="object-cover opacity-[0.12] grayscale" />
      <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/85 to-ink" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal variant="up">
          <p className="eyebrow mb-4 inline-flex items-center gap-2 text-cream/50">
            <MountainIcon className="h-4 w-4 text-[#6b8e1f]" /> Mountaineering · 6,000–7,000 m
          </p>
          <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
            When the trail runs out, <span className="text-[#6b8e1f]">rope up</span>
          </h2>
        </Reveal>

        {/* one combined carousel of every peak */}
        <div className="mt-12">
          <ExpeditionMarquee items={allPeaks} />
        </div>

        <Reveal variant="fade" className="mt-12 text-center">
          <Link
            href="/mountaineering"
            className="group inline-flex items-center gap-3 rounded-full border border-cream/40 px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            View all peaks
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal variant="fade" delay={0.1}>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-cream/12 bg-white/[0.03] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="display text-2xl text-cream sm:text-3xl">Planning an expedition?</p>
              <p className="mt-2 max-w-md text-cream/60">
                Tell us your objective and experience — we&apos;ll build the climb,
                the schedule and the support around you.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark"
            >
              Talk to us
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
