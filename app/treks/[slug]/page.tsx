import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/icons";
import { getTrek, featuredTreks } from "@/lib/data";

export function generateStaticParams() {
  return featuredTreks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trek = getTrek(slug);
  if (!trek) return { title: "Trek not found — HUX EXPED" };
  return { title: `${trek.name} — HUX EXPED`, description: trek.blurb };
}

export default async function TrekPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trek = getTrek(slug);
  if (!trek) notFound();

  const facts = [
    ["Duration", trek.days],
    ["Max altitude", trek.altitude],
    ["Grade", trek.grade],
    ["Best season", trek.season],
    ["From", trek.price.replace("from ", "")],
  ];

  return (
    <>
      <Navbar subpage />
      <main>
        {/* hero */}
        <section className="relative h-[82vh] overflow-hidden bg-ink">
          <Image src={trek.hero} alt={trek.name} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-ink/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8">
              <Link href="/#treks" className="mb-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/80 hover:text-coral">
                <ArrowIcon className="h-4 w-4 rotate-180" /> All treks
              </Link>
              <p className="eyebrow mb-3 text-cream/70">{trek.region}</p>
              <h1 className="display max-w-4xl text-5xl leading-[0.9] text-cream sm:text-7xl lg:text-8xl">{trek.name}</h1>
              <p className="mt-4 max-w-xl text-base text-cream/85 sm:text-lg">{trek.tagline}</p>
            </div>
          </div>
        </section>

        {/* facts bar */}
        <section className="border-b border-line bg-cream">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-line px-5 sm:grid-cols-3 sm:px-8 lg:grid-cols-5 lg:divide-x">
            {facts.map(([k, v]) => (
              <div key={k} className="py-7 lg:px-6 lg:first:pl-0">
                <div className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">{k}</div>
                <div className="display mt-1 text-2xl text-ink">{v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* overview + highlights */}
        <section className="paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Reveal variant="up">
              <p className="eyebrow mb-5">The expedition</p>
              <h2 className="display text-4xl text-ink sm:text-5xl">{trek.tagline}</h2>
              {trek.overview.map((p) => (
                <p key={p} className="mt-6 leading-relaxed text-ink-soft">{p}</p>
              ))}
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <div className="rounded-2xl border border-line bg-cream-deep p-8">
                <h3 className="eyebrow mb-6">Highlights</h3>
                <ul className="space-y-4">
                  {trek.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-ink">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* gallery */}
        <section className="bg-cream-deep py-24 sm:py-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up"><h2 className="display mb-12 text-4xl text-ink sm:text-5xl">On the trail</h2></Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trek.gallery.map((src, i) => (
                <Reveal key={src} variant="fade" delay={i * 0.06}>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-cream">
                    <Image src={src} alt={`${trek.name} ${i + 1}`} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* itinerary */}
        <section className="paper py-24 sm:py-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up"><p className="eyebrow mb-5">Day by day</p><h2 className="display mb-14 text-4xl text-ink sm:text-6xl">Itinerary</h2></Reveal>
            <div className="border-t border-line">
              {trek.itinerary.map((d) => (
                <Reveal key={d.day} variant="up">
                  <div className="grid gap-4 border-b border-line py-8 sm:grid-cols-[120px_1fr_2fr] sm:gap-8">
                    <span className="display text-2xl text-coral">{d.day}</span>
                    <span className="display text-xl text-ink">{d.title}</span>
                    <span className="leading-relaxed text-ink-soft">{d.detail}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* included + CTA */}
        <section className="bg-ink py-24 text-cream sm:py-32">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="up">
              <h2 className="display text-4xl sm:text-5xl">What&apos;s included</h2>
              <ul className="mt-8 space-y-4">
                {trek.included.map((it) => (
                  <li key={it} className="flex items-start gap-3 border-b border-cream/12 pb-4 text-cream/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="up" delay={0.1} className="flex flex-col justify-center">
              <p className="eyebrow text-cream/50">Ready when you are</p>
              <p className="display mt-4 text-5xl">{trek.price}</p>
              <p className="mt-3 text-cream/70">per person · {trek.days} · small group</p>
              <a href="#" className="group mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-coral px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark">
                Enquire about this trek
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link href="/#treks" className="mt-6 text-sm text-cream/60 underline-offset-4 hover:text-coral hover:underline">← Back to all treks</Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
