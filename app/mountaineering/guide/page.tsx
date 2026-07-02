import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { MountainIcon, ArrowIcon } from "@/components/ui/icons";
import { photos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mountaineering guide — HUX EXPED",
  description:
    "How our guided Himalayan climbs work — from your first 6,000 m trekking peak to full expeditions. Training, gear, ratios, acclimatisation and what's included.",
};

const sections = [
  {
    heading: "How our guided climbs work",
    body: [
      "Every climb is led by licensed Nepali mountain guides who grew up in these ranges, with deliberately low client-to-guide ratios. Trekking peaks run with a dedicated rope-leader; bigger objectives add high-altitude climbing sherpas and a fixed-rope team.",
      "You don't need to be a mountaineer to start. Our 6,000 m peaks like Island Peak and Mera are designed as first summits — we teach the skills on the approach so you arrive at high camp ready.",
    ],
  },
  {
    heading: "Training & fitness",
    body: [
      "Come with a solid aerobic base — long hill days with a pack are the best preparation. For technical peaks we run a skills day on the glacier: crampons, ice axe, fixed-rope ascending and descending, and crevasse-rescue basics.",
      "We'll send a tailored training plan once you book, and we're happy to talk through your background before you commit to an objective.",
    ],
  },
  {
    heading: "Safety & acclimatisation",
    body: [
      "Our itineraries are built around slow, safe acclimatisation, with extra nights above 3,500 m and built-in contingency days. Every trip carries comprehensive medical kit, a clear evacuation plan and mandatory high-altitude insurance.",
      "All guides are first-aid and rescue trained. The mountain sets the schedule — if conditions or health say wait, we wait.",
    ],
  },
];

const included = [
  "Licensed climbing guide & dedicated rope-leader",
  "All permits, peak fees and national-park fees",
  "Group climbing hardware & fixed ropes",
  "Local porters and crew, fairly paid and equipped",
  "All meals and accommodation on the mountain",
  "On-trail skills coaching for any level",
];

export default function MountaineeringGuidePage() {
  return (
    <>
      <Navbar subpage />
      <main className="pt-20">
        {/* hero */}
        <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-ink">
          <Image
            src={photos.demali}
            alt="A summit ridge in the high Himalaya"
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/25" />
          <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-12 sm:px-8 sm:pb-16">
            <Reveal variant="up">
              <p className="eyebrow mb-5 inline-flex items-center gap-2 text-cream/70">
                <MountainIcon className="h-4 w-4 text-[#1f6f96]" /> Mountaineering guide
              </p>
              <h1 className="display max-w-4xl text-4xl leading-[0.98] text-cream sm:text-6xl lg:text-7xl">
                From first summit to full expedition
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
                Everything you need to know about climbing with us — how guided
                ascents work, how to prepare, and what we take care of.
              </p>
            </Reveal>
          </div>
        </section>

        {/* content */}
        <section className="paper py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1100px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_320px] lg:gap-16">
            <article>
              {sections.map((s) => (
                <Reveal key={s.heading} variant="up" className="mb-12 last:mb-0">
                  <h2 className="display text-3xl text-ink sm:text-4xl">{s.heading}</h2>
                  {s.body.map((p) => (
                    <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-ink-soft">
                      {p}
                    </p>
                  ))}
                </Reveal>
              ))}
            </article>

            {/* included card */}
            <Reveal variant="up" delay={0.1}>
              <aside className="rounded-2xl border border-line bg-cream-deep p-7 lg:sticky lg:top-28">
                <p className="eyebrow mb-5 text-muted">What&apos;s included</p>
                <ul className="space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-snug text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/mountaineering"
                  className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-[#1f6f96]"
                >
                  Browse the peaks
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-20 text-cream sm:py-24">
          <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:items-center">
            <div>
              <p className="display text-3xl sm:text-4xl">Planning an expedition?</p>
              <p className="mt-2 max-w-md text-cream/70">
                Tell us your objective and experience — we&apos;ll build the climb
                and the support around you.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark"
            >
              Talk to us
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
