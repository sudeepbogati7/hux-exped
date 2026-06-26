import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import { MountainIcon, ArrowIcon } from "@/components/ui/icons";
import { about, team, certifications, photos } from "@/lib/data";

const SECTIONS = {
  "our-story": { eyebrow: "Our story", title: "A reason to go." },
  "our-team": { eyebrow: "Our team", title: "The people who get you up there" },
  certifications: { eyebrow: "Certifications & associations", title: "Licensed, insured & accountable" },
  "why-us": { eyebrow: "Why us", title: "What sets us apart" },
  testimonials: { eyebrow: "Testimonials", title: "Words from the rope team" },
} as const;

type SectionKey = keyof typeof SECTIONS;

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const s = SECTIONS[section as SectionKey];
  if (!s) return { title: "About — HUX EXPED" };
  return { title: `${s.eyebrow} — HUX EXPED` };
}

export default async function AboutSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const meta = SECTIONS[section as SectionKey];
  if (!meta) notFound();

  // why-us & testimonials reuse full sections that carry their own headers
  const bareComponent = section === "why-us" || section === "testimonials";

  return (
    <>
      <Navbar subpage />
      <main className="pt-20">
        {!bareComponent && (
          <section className="paper pt-16 sm:pt-24">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
              <Reveal variant="up">
                <p className="eyebrow mb-5 inline-flex items-center gap-2">
                  <MountainIcon className="h-4 w-4 text-coral" /> {meta.eyebrow}
                </p>
                <h1 className="display max-w-3xl text-4xl text-ink sm:text-6xl lg:text-7xl">
                  {meta.title}
                </h1>
              </Reveal>
            </div>
          </section>
        )}

        {section === "our-story" && (
          <section className="paper py-16 sm:py-20">
            <div className="mx-auto grid max-w-[1400px] items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
              <Reveal variant="mask" className="relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-deep">
                  <Image src={photos.prepping} alt="Prepping systems before a climb" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
                    Founder &amp; guide
                  </span>
                </div>
              </Reveal>
              <Reveal variant="up" delay={0.1}>
                {[...about.mission.body, ...about.upThere.body].map((p, i) => (
                  <p key={p.slice(0, 40)} className={`max-w-md leading-relaxed text-ink-soft ${i === 0 ? "text-lg text-ink" : "mt-5"}`}>
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {section === "our-team" && (
          <section className="paper py-16 sm:py-20">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {team.map((m, i) => (
                  <Reveal key={m.name} variant="up" delay={(i % 4) * 0.08}>
                    <div className="group">
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-deep">
                        <Image src={m.img} alt={m.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0" />
                      </div>
                      <h3 className="display mt-4 text-2xl text-ink">{m.name}</h3>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-coral">{m.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {section === "certifications" && (
          <section className="paper py-16 sm:py-20">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((c) => (
                  <Reveal key={c.name} variant="fade" className="flex h-full items-center gap-5 rounded-2xl border border-line bg-cream p-7">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 ring-1 ring-line">
                      <Image src={c.logo} alt={c.name} width={80} height={80} className="h-full w-full object-contain" />
                    </span>
                    <span className="text-ink">{c.name}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {section === "why-us" && <WhyChooseUs id="why-us" />}
        {section === "testimonials" && <Testimonials />}

        {/* back to about */}
        <section className="paper pb-20 sm:pb-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-coral"
            >
              <ArrowIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              All about Hux Exped
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
