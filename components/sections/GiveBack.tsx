import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { HeartIcon } from "@/components/ui/icons";
import { giveBack } from "@/lib/data";

export default function GiveBack() {
  return (
    <section id="give-back" className="bg-cream-deep py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* heading */}
        <Reveal variant="up" className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5 inline-flex items-center gap-2">
            <HeartIcon className="h-4 w-4 text-coral" /> {giveBack.eyebrow}
          </p>
          <h2 className="display text-4xl text-ink sm:text-5xl lg:text-6xl">
            Why we <span className="text-coral">give back</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink">
            {giveBack.body[0]}
          </p>
        </Reveal>

        {/* feature illustration — transparent PNG, no backing */}
        <Reveal variant="fade" className="relative mx-auto mt-10 max-w-3xl">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src="/charity.png"
              alt="Surfing for Farmers and the mountains both feeding into mental-health charity"
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-contain"
            />
          </div>
        </Reveal>

        {/* supporting copy */}
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal variant="up">
            <p className="max-w-xl leading-relaxed text-ink-soft">{giveBack.body[1]}</p>
            <p className="mt-6 max-w-xl text-lg italic leading-relaxed text-ink">
              &ldquo;Getting outside and doing something hard with good people
              works. We&apos;ve seen it.&rdquo;
            </p>
          </Reveal>

          <Reveal variant="up" delay={0.1}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-cream px-6 py-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-coral text-cream">
                <HeartIcon className="h-5 w-5" />
              </span>
              <span className="text-sm leading-snug text-ink">
                <span className="font-semibold">A portion of every booking</span>{" "}
                funds mental-health charities, including{" "}
                <span className="font-semibold text-coral">{giveBack.charity}</span>.
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
