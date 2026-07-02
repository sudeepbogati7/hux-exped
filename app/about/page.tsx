import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import { ArrowIcon, HeartIcon, MountainIcon, ShieldIcon } from "@/components/ui/icons";
import { about, giveBack, stats, photos, team, certifications } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — HUX EXPED",
  description:
    "Hux Exped is a reason to go: ten people, a serious mountain, and a guide who genuinely loves this stuff. A portion of every trip funds village schools and health posts in the Nepal valleys we walk.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar subpage />
      <main>
        {/* hero */}
        <section className="relative flex h-[88vh] min-h-[560px] items-end overflow-hidden bg-ink">
          <Image
            src={photos.demali}
            alt="A summit ridge in the high mountains"
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/25" />
          <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8 sm:pb-20">
            <Reveal variant="up">
              <p className="eyebrow mb-5 text-cream/70">About · Hux Exped</p>
              <h1 className="display max-w-5xl text-4xl leading-[0.98] text-cream sm:text-6xl lg:text-7xl">
                {about.mission.title}
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
                {about.mission.body[0]}
              </p>
            </Reveal>
          </div>
        </section>

        {/* mission */}
        <section id="our-story" className="paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1400px] items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="mask" className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-deep">
                <Image
                  src={photos.prepping}
                  alt="Prepping systems before a climb"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
                  Founder &amp; guide
                </span>
              </div>
            </Reveal>
            <Reveal variant="up" delay={0.1} className="order-1 lg:order-2">
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <MountainIcon className="h-4 w-4 text-[#1f6f96]" /> {about.mission.eyebrow}
              </p>
              <h2 className="display text-4xl text-ink sm:text-5xl">A reason to go.</h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-ink">
                {about.mission.body[1]}
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
                {stats.map((s) => (
                  <StatCounter key={s.label} {...s} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* what happens up there */}
        <section className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
          <Image src={photos.nightSky} alt="" fill sizes="100vw" className="object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/85 to-ink" />
          <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-8">
            <Reveal variant="up">
              <p className="eyebrow mb-5 text-cream/50">{about.upThere.eyebrow}</p>
              <h2 className="display text-4xl sm:text-5xl lg:text-6xl">{about.upThere.title}</h2>
            </Reveal>
            {about.upThere.body.map((p, i) => (
              <Reveal key={i} variant="up" delay={0.1 + i * 0.05}>
                <p className={`mx-auto mt-7 max-w-2xl leading-relaxed ${i === 0 ? "text-lg text-cream/90" : "text-cream/70"}`}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* our team */}
        <section id="our-team" className="paper py-24 sm:py-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up">
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <MountainIcon className="h-4 w-4 text-[#1f6f96]" /> Our team
              </p>
              <h2 className="display max-w-3xl text-4xl text-ink sm:text-5xl lg:text-6xl">
                The people who get you up there
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <Reveal key={m.name} variant="up" delay={(i % 4) * 0.08}>
                  <div className="group">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-deep">
                      <Image
                        src={m.img}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                      />
                    </div>
                    <h3 className="display mt-4 text-2xl text-ink">{m.name}</h3>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#1f6f96]">{m.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* certifications & associations */}
        <section id="certifications" className="bg-cream-deep py-24 sm:py-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="grid items-end gap-8 border-b border-line pb-12 lg:grid-cols-[1.4fr_1fr]">
              <Reveal variant="up">
                <p className="eyebrow mb-5 inline-flex items-center gap-2">
                  <ShieldIcon className="h-4 w-4 text-[#1f6f96]" /> Certifications &amp; associations
                </p>
                <h2 className="display text-4xl text-ink sm:text-5xl lg:text-6xl">
                  Licensed, insured
                  <br />
                  and accountable
                </h2>
              </Reveal>
              <Reveal variant="up" delay={0.1}>
                <p className="max-w-sm leading-relaxed text-ink-soft lg:pb-2">
                  We hold the permits and memberships that keep you safe and our
                  crew fairly treated — and we&apos;re happy to show them.
                </p>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((crt) => (
                <Reveal key={crt.name} variant="fade" className="bg-cream">
                  <div className="flex h-full items-center gap-5 p-7 sm:p-8">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 ring-1 ring-line">
                      <Image
                        src={crt.logo}
                        alt={crt.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <span className="text-ink">{crt.name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* why us */}
        <WhyChooseUs id="why-us" />

        {/* testimonials */}
        <Testimonials id="testimonials" />

        {/* why we give back */}
        <section id="give-back" className="bg-cream-deep py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1400px] items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="up">
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <HeartIcon className="h-4 w-4 text-[#1f6f96]" /> {giveBack.eyebrow}
              </p>
              <h2 className="display text-4xl text-ink sm:text-5xl lg:text-6xl">
                Why we <span className="text-[#1f6f96]">give back</span>
              </h2>
              {giveBack.body.map((p, i) => (
                <p key={i} className={`mt-6 max-w-md leading-relaxed ${i === 0 ? "text-lg text-ink" : "text-ink-soft"}`}>
                  {p}
                </p>
              ))}
              <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-cream px-6 py-3 text-sm font-semibold text-ink">
                <span className="h-2 w-2 rounded-full bg-coral" />
                Founder of {giveBack.charity}
              </p>
            </Reveal>
            <Reveal variant="mask" className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream">
                <Image
                  src={photos.walking}
                  alt="A share of every booking funds village schools and health posts in the Nepal valleys we trek"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* bespoke / CTA */}
        <section className="bg-ink py-24 text-cream sm:py-32">
          <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-8">
            <Reveal variant="up">
              <p className="eyebrow mb-5 text-cream/50">{about.bespoke.eyebrow}</p>
              <h2 className="display text-4xl leading-[0.98] sm:text-5xl lg:text-6xl">
                {about.bespoke.title}
              </h2>
              <p className="mx-auto mt-7 max-w-xl leading-relaxed text-cream/80">
                {about.bespoke.body}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-coral px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark"
                >
                  Start a conversation
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/#treks"
                  className="rounded-full border border-cream/40 px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-ink"
                >
                  See the expeditions
                </Link>
              </div>
              <p className="mt-12 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-cream/40">
                Trek far · Give back
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
