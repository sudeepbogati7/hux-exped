import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/icons";
import { photos } from "@/lib/data";

export default function AboutCompany() {
  return (
    <section className="paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* image */}
        <Reveal variant="mask" className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(20,20,20,0.5)]">
            <Image
              src={photos.carries}
              alt="The HUX EXPED crew on the mountain"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* copy */}
        <Reveal variant="up">
          <div className="flex flex-wrap items-end gap-x-4">
            <span className="display text-6xl leading-none text-ink sm:text-7xl lg:text-8xl">HUX</span>
            <span className="display text-4xl leading-none text-coral sm:text-5xl lg:text-6xl">EXPED</span>
          </div>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">
            The offbeat specialists
          </p>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
            HUX EXPED is a homegrown expedition company built by Nepali guides
            who grew up in these valleys. We run small-group treks and climbs
            into the restricted, offbeat corners of the Himalaya most travellers
            never reach — carefully, responsibly, and a long way from the crowds.
          </p>

          <Link
            href="/about"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-coral px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark"
          >
            About company
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
