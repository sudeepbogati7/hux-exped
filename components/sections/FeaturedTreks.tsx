import Reveal from "@/components/ui/Reveal";
import { PeakIcon } from "@/components/ui/icons";
import TrekCard from "./TrekCard";
import { featuredTreks } from "@/lib/data";

export default function FeaturedTreks() {
  return (
    <section id="treks" className="bg-cream-deep py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-end gap-8 border-b border-line pb-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal variant="up">
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <PeakIcon className="h-4 w-4" /> Featured expeditions
            </p>
            <h2 className="display text-5xl text-ink sm:text-7xl">
              Two treks that
              <br />
              change people
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-sm leading-relaxed text-ink-soft lg:pb-2">
              Restricted, remote and unforgettable. These are the flagships of
              the HUX EXPED calendar — booked months ahead, walked by few.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-28">
          {featuredTreks.map((trek, i) => (
            <TrekCard key={trek.slug} trek={trek} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
