import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { CalendarIcon, ArrowIcon } from "@/components/ui/icons";
import { getFlagshipTreks } from "@/lib/expeditions";

export default async function Flagships() {
  const flagshipTreks = await getFlagshipTreks();
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

        {/* both flagships, compact and side by side */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {flagshipTreks.map((trek, i) => {
            const href = `/treks/${trek.slug}`;
            const bg = `/moutains/${trek.slug}.png`;
            return (
              <Reveal key={trek.slug} variant="up" delay={i * 0.08}>
                <Link
                  href={href}
                  className="group relative flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(20,20,20,0.6)]"
                >
                  {/* background image + overlay */}
                  <Image
                    src={bg}
                    alt={`${trek.name}, Nepal`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-60 transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-ink/30" />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/70 to-ink/40" />

                  {/* top badges */}
                  <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-cream/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
                      {trek.meta}
                    </span>
                    <span className="rounded-full bg-coral px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink">
                      {trek.price}
                    </span>
                  </div>

                  {/* body over image */}
                  <div className="relative flex flex-col p-6 text-cream sm:p-8">
                    <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-ink/60 px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-coral motion-safe:animate-pulse" /> Next departure
                    </span>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/70">{trek.region}</p>
                    <h3 className="display mt-2 text-3xl text-cream transition-colors duration-300 group-hover:text-coral sm:text-4xl">
                      {trek.name}
                    </h3>
                    <p className="mt-3 max-w-md leading-relaxed text-cream/80">{trek.blurb}</p>

                    <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-cream/20 pt-5">
                      {[
                        ["Duration", trek.days],
                        ["Max altitude", trek.altitude],
                        ["Grade", trek.grade],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cream/55">{k}</dt>
                          <dd className="display mt-1 text-lg text-cream">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <span className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-300 group-hover:gap-3 group-hover:bg-coral-dark">
                      View expedition
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
