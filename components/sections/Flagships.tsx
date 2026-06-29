import Reveal from "@/components/ui/Reveal";
import { CalendarIcon } from "@/components/ui/icons";
import TrekCard from "./TrekCard";
import { flagshipTreks } from "@/lib/data";

export default function Flagships() {
  return (
    <section id="flagships" className="paper py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal variant="up">
          <p className="eyebrow mb-4 inline-flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[#6b8e1f]" /> Handpicked journeys
          </p>
          <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">
            Featured <span className="text-[#6b8e1f]">treks</span>
          </h2>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28">
          {flagshipTreks.map((trek, i) => (
            <TrekCard key={trek.slug} trek={trek} flip={i % 2 === 1} upcoming />
          ))}
        </div>
      </div>
    </section>
  );
}
