import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { CameraIcon, ArrowIcon, CheckIcon } from "@/components/ui/icons";
import { shall, shallPhotos } from "@/lib/data";

export default function Photography() {
  return (
    <section id="photography" className="paper py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* images */}
          <Reveal variant="mask" className="relative order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-deep">
              <Image
                src={shall.feature}
                alt="Photograph by Shall in the Nepal Himalaya"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
                <CameraIcon className="h-4 w-4 text-coral" /> Once a year · select treks
              </span>
            </div>
            {/* thumbnail strip */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              {shallPhotos.slice(1, 4).map((p) => (
                <div key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream-deep">
                  <Image src={p.src} alt={p.alt} fill sizes="200px" className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>

          {/* copy */}
          <Reveal variant="up" delay={0.1} className="order-2">
            <p className="eyebrow mb-5">Photography expeditions · once a year</p>
            <h2 className="display text-5xl text-ink sm:text-6xl">
              Shoot the
              <br />
              <span className="mark">real Nepal</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink">
              {shall.lead} {shall.intro}
            </p>

            <ul className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
              {shall.offers.map((o) => (
                <li key={o} className="flex items-start gap-3 text-ink">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-coral text-cream">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span className="leading-snug">{o}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/photography"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral"
              >
                See the work &amp; the team
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
