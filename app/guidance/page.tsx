import type { Metadata } from "next";
import type { ReactElement } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import {
  ShieldIcon,
  GaugeIcon,
  UsersIcon,
  MapPinIcon,
  FlagIcon,
  CompassIcon,
  HeartIcon,
} from "@/components/ui/icons";
import { guidance } from "@/lib/data";

export const metadata: Metadata = {
  title: "Guidance — HUX EXPED",
  description:
    "Everything you need before a Himalayan trek — gear, altitude, permits, visas, insurance and more.",
};

const icons: Record<string, (p: { className?: string }) => ReactElement> = {
  shield: ShieldIcon,
  gauge: GaugeIcon,
  users: UsersIcon,
  mappin: MapPinIcon,
  flag: FlagIcon,
  compass: CompassIcon,
  heart: HeartIcon,
};

export default function GuidancePage() {
  return (
    <>
      <Navbar subpage />
      <main className="pt-20">
        {/* header */}
        <section className="paper py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up">
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <CompassIcon className="h-4 w-4 text-coral" /> Guidance
              </p>
              <h1 className="display text-5xl text-ink sm:text-7xl lg:text-8xl">
                Before you go
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                The practical stuff — gear, altitude, permits and paperwork — so
                you can turn up prepared and spend your energy on the mountain.
              </p>
            </Reveal>
          </div>
        </section>

        {/* index + content */}
        <section className="paper pb-24 sm:pb-32">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* sticky index */}
            <aside className="hidden lg:block">
              <nav className="sticky top-28 border-l border-line">
                {guidance.map((t) => (
                  <a
                    key={t.slug}
                    href={`#${t.slug}`}
                    className="-ml-px block border-l-2 border-transparent py-2 pl-5 text-sm font-medium text-ink-soft transition-colors hover:border-coral hover:text-coral"
                  >
                    {t.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* topics */}
            <div>
              {guidance.map((t) => {
                const Icon = icons[t.icon] ?? CompassIcon;
                return (
                  <section
                    key={t.slug}
                    id={t.slug}
                    className="border-t border-line py-12 first:border-t-0 first:pt-0"
                  >
                    <Reveal variant="up">
                      <div className="flex flex-col gap-5 sm:flex-row sm:gap-7">
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-cream">
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <h2 className="display text-3xl text-ink sm:text-4xl">{t.title}</h2>
                          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                            {t.lead}
                          </p>
                          {t.points && (
                            <ul className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
                              {t.points.map((p) => (
                                <li key={p} className="flex items-start gap-3 text-ink">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                                  <span className="leading-snug">{p}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  </section>
                );
              })}

              {/* CTA */}
              <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-cream-deep p-8 sm:flex-row sm:items-center sm:p-10">
                <div>
                  <p className="display text-2xl text-ink sm:text-3xl">Still have questions?</p>
                  <p className="mt-2 max-w-md text-ink-soft">
                    We&apos;ll talk you through gear, fitness and permits before
                    you commit to anything.
                  </p>
                </div>
                <Link
                  href="/#contact"
                  className="inline-flex shrink-0 items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
