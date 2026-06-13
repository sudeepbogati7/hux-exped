import Reveal from "@/components/ui/Reveal";
import { CalendarIcon } from "@/components/ui/icons";
import TrekCard from "./TrekCard";
import { flagshipTreks } from "@/lib/data";

export default function Flagships() {
  return (
    <section id="flagships" className="paper py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-end gap-8 border-b border-line pb-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal variant="up">
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-coral" /> Upcoming departures
            </p>
            <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">
              Next out
              <br />
              the <span className="text-coral">door</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-sm leading-relaxed text-ink-soft lg:pb-2">
              Our nearest departures into the offbeat Himalaya — restricted,
              remote and booked months ahead. Reserve your place before they
              fill.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-28">
          {flagshipTreks.map((trek, i) => (
            <TrekCard key={trek.slug} trek={trek} index={i} flip={i % 2 === 1} upcoming />
          ))}
        </div>
      </div>
    </section>
  );
}
