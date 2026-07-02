import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";
import { HeartIcon, CameraIcon } from "@/components/ui/icons";
import { stats, photos } from "@/lib/data";

export default function AboutUs() {
  return (
    <section id="about" className="bg-cream-deep py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* left: story */}
          <div>
            <Reveal variant="up">
              <p className="eyebrow mb-5">About us</p>
              <h2 className="display text-5xl text-ink sm:text-6xl">
                A small outfit,
                <br />
                a big backyard
              </h2>
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink">
                HUX EXPED started with a simple idea: Nepal is so much more than
                the three treks everyone&apos;s heard of.
              </p>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                Two decades on, we run small-group expeditions into the
                restricted and forgotten corners of the Himalaya — led by Nepali
                guides who grew up in these valleys. No mega-groups, no cut
                corners, no postcard checklist.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-10">
              {stats.map((s) => (
                <StatCounter key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* right: image + cards */}
          <Reveal variant="mask" className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
              <Image
                src={photos.baseCamp}
                alt="A HUX EXPED photography expedition at altitude"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* photography expedition tag */}
              <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full bg-cream/90 px-5 py-3 backdrop-blur">
                <CameraIcon className="h-5 w-5 text-[#1f6f96]" />
                <span className="text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.14em] text-ink">
                  Photography
                  <br />
                  expeditions
                </span>
              </div>
              {/* mental health pledge */}
              <div className="absolute inset-x-4 bottom-4 flex items-start gap-4 rounded-2xl bg-ink/85 p-6 text-cream backdrop-blur">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral">
                  <HeartIcon className="h-4 w-4" />
                </span>
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">5% of every trek</span> funds
                  men&apos;s mental health &amp; suicide-prevention work. Built
                  into the price — no fine print.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
