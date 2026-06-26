import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ExpeditionMarquee from "@/components/ui/ExpeditionMarquee";
import { MountainIcon, ArrowIcon } from "@/components/ui/icons";
import { featuredTreks } from "@/lib/data";

export default function OffbeatTreks() {
  return (
    <section id="treks" className="bg-cream-deep py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal variant="up">
          <p className="eyebrow mb-4 inline-flex items-center gap-2">
            <MountainIcon className="h-4 w-4 text-coral" /> Offbeat Nepal
          </p>
          <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">
            Trails the crowds never <span className="text-coral">find</span>
          </h2>
        </Reveal>
      </div>

      {/* full-bleed carousel */}
      <div className="mt-12">
        <ExpeditionMarquee items={featuredTreks} />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal variant="fade" className="mt-12 text-center">
          <Link
            href="/treks"
            className="group inline-flex items-center gap-3 rounded-full border border-ink px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            View all treks
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
