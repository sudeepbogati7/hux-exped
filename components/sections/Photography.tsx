import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { CameraIcon, ArrowIcon } from "@/components/ui/icons";
import { uns } from "@/lib/data";

export default function Photography() {
  return (
    <section id="photography" className="paper py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* image */}
          <Reveal variant="mask" className="relative order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-deep">
              <Image
                src={uns("1492146433370-dea32142adc3", 1400)}
                alt="Photographer shooting first light in the Nepal Himalaya"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
                <CameraIcon className="h-4 w-4 text-coral" /> Once a year · Led by Shal
              </span>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal variant="up" delay={0.1} className="order-2">
            <p className="eyebrow mb-5">The photography expedition</p>
            <h2 className="display text-5xl text-ink sm:text-6xl">
              Shoot the real
              <br />
              Nepal with <span className="mark">Shal</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink">
              Once a year, professional photographer{" "}
              <strong className="font-semibold">Shal</strong> leads a small crew
              deep into the off-beat Himalaya — a Nepal adventure photography
              expedition built around first light, high passes and the quiet
              life of the unseen valleys.
            </p>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              Mornings on the tripod, afternoons on the trail, evenings reviewing
              frames over chai. Built for every level — from first mirrorless to
              seasoned pro.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a
                href="#gallery"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral"
              >
                See the work
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <div className="text-sm text-ink-soft">
                <span className="display block text-2xl text-ink">Next departure</span>
                October · 14 days · 8 spots
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
