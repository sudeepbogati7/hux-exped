import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import GalleryMasonry from "@/components/sections/GalleryMasonry";
import { CircularGallery } from "@/components/modern/Circular-Gallery";
import { CameraIcon, CheckIcon, ArrowIcon } from "@/components/ui/icons";
import { shall, shallPhotos } from "@/lib/data";

// Keep the 3D ring selective (8 frames spread across the set) so they don't overlap.
const circularItems = [0, 2, 4, 6, 8, 10, 12, 14]
  .map((i) => shallPhotos[i])
  .filter(Boolean)
  .map((p) => ({
    common: p.alt,
    binomial: "Nepal · Himalaya",
    photo: { url: p.src, text: p.alt, by: shall.name },
  }));

export const metadata: Metadata = {
  title: "Photography — HUX EXPED",
  description:
    "Once a year a dedicated professional photography team — led by Shall — joins a hand-picked HUX EXPED trek and documents the whole journey. A service you can book onto.",
};

export default function PhotographyPage() {
  return (
    <>
      <Navbar subpage />
      <main>
        {/* hero */}
        <section className="relative flex min-h-[82vh] items-end overflow-hidden bg-ink pt-20 text-cream">
          <Image src={shall.feature} alt="Photograph by Shall" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/25" />
          <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8 sm:pb-20">
            <Reveal variant="up">
              <p className="eyebrow mb-5 inline-flex items-center gap-2 text-cream/70">
                <CameraIcon className="h-4 w-4 text-coral" /> Photography expeditions · once a year
              </p>
              <h1 className="display max-w-4xl text-5xl leading-[0.95] text-cream sm:text-7xl lg:text-8xl">
                Come home with
                <br />
                the <span className="text-coral">whole trek</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
                {shall.intro}
              </p>
            </Reveal>
          </div>
        </section>

        {/* the service */}
        <section className="paper py-24 sm:py-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
              <Reveal variant="up">
                <p className="eyebrow mb-5">A photography expedition, once a year</p>
                <h2 className="display text-4xl text-ink sm:text-5xl">
                  A service you can book onto — not a phone in your pocket.
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink">
                  Once a year a dedicated professional photography team — led by
                  Shall — joins a hand-picked trek and shoots it end to end, from
                  base-camp life to summit light. You stay present on the trail
                  and still come home with a gallery worth printing.
                </p>
              </Reveal>
              <Reveal variant="up" delay={0.1}>
                <div className="rounded-2xl border border-line bg-cream-deep p-8">
                  <h3 className="eyebrow mb-6">What you get</h3>
                  <ul className="space-y-4">
                    {shall.offers.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-ink">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral text-cream">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                        <span className="leading-snug">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* meet Shall */}
        <section className="bg-cream-deep py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1400px] items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="mask" className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream">
                <Image src={shall.portrait} alt="Shall, expedition photographer" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
                  {shall.name} · {shall.role}
                </span>
              </div>
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <p className="eyebrow mb-5">The team behind the lens</p>
              <h2 className="display text-4xl text-ink sm:text-5xl">
                Led by {shall.name}
              </h2>
              {shall.bio.map((p) => (
                <p key={p} className="mt-6 max-w-md leading-relaxed text-ink-soft">{p}</p>
              ))}
            </Reveal>
          </div>
        </section>

        {/* the work — 3D showcase */}
        <section className="paper pt-24 sm:pt-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up" className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5 inline-flex items-center gap-2">
                  <CameraIcon className="h-4 w-4 text-coral" /> The work
                </p>
                <h2 className="display text-5xl text-ink sm:text-6xl">Frames by {shall.name}</h2>
              </div>
              <p className="max-w-sm leading-relaxed text-ink-soft">
                A handful of favourites from the field — Nepal, the Khumbu and
                the Southern Alps. Scroll to spin the showcase.
              </p>
            </Reveal>
          </div>
          {/* 3D circular gallery — selective frames */}
          <div className="relative mt-6 h-[440px] overflow-hidden sm:h-[540px] lg:h-[600px]">
            <CircularGallery items={circularItems} radius={500} />
          </div>
        </section>

        {/* full collection grid */}
        <section className="paper pb-24 sm:pb-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up" className="mb-10 border-t border-line pt-12">
              <h3 className="display text-3xl text-ink sm:text-4xl">The full collection</h3>
              <p className="mt-2 max-w-md leading-relaxed text-ink-soft">
                Tap any frame to view it large.
              </p>
            </Reveal>
            <GalleryMasonry items={shallPhotos} />
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28">
          <Image src={shallPhotos[2].src} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/70" />
          <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-8">
            <h2 className="display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
              Walk it. We&apos;ll <span className="text-coral">shoot it.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-cream/80">
              The photography expedition runs once a year on a select trek — ask
              us which departure is next and we&apos;ll save you a spot.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/treks" className="group inline-flex items-center gap-3 rounded-full bg-coral px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark">
                Browse the treks
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/#contact" className="rounded-full border border-cream/40 px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-ink">
                Ask about photography
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
