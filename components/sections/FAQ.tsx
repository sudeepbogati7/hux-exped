"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { GaugeIcon, FlagIcon, UsersIcon, HeartIcon, CalendarIcon, ShieldIcon } from "@/components/ui/icons";
import { faqs } from "@/lib/data";

const faqIcon: Record<string, (p: { className?: string }) => ReactElement> = {
  gauge: GaugeIcon,
  flag: FlagIcon,
  users: UsersIcon,
  heart: HeartIcon,
  calendar: CalendarIcon,
  shield: ShieldIcon,
};

export default function FAQ() {
  const [active, setActive] = useState(0);
  const f = faqs[active];
  const ActiveIcon = faqIcon[f.icon] ?? GaugeIcon;

  return (
    <section id="faq" className="paper py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal variant="up" className="mb-12 max-w-2xl">
          <p className="eyebrow mb-5">Good to know</p>
          <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">
            Frequently <span className="text-[#1f6f96]">asked</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* questions (+ inline answers on mobile) */}
          <Reveal variant="up">
            <div className="flex flex-col gap-2">
              {faqs.map((q, i) => {
                const on = i === active;
                const Icon = faqIcon[q.icon] ?? GaugeIcon;
                return (
                  <div key={q.q}>
                    <button
                      onClick={() => setActive(i)}
                      className={`group flex w-full items-center justify-between gap-5 rounded-2xl border px-6 py-5 text-left transition-all duration-300 ${
                        on ? "border-ink bg-ink text-cream" : "border-line bg-cream text-ink hover:border-ink/40"
                      }`}
                      aria-expanded={on}
                    >
                      <span className="display text-lg sm:text-xl">{q.q}</span>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl transition-all duration-300 ${
                          on ? "rotate-45 bg-coral text-ink" : "border border-line text-ink group-hover:border-ink"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {/* mobile inline answer */}
                    <div
                      className={`grid transition-all duration-500 ease-out-expo lg:hidden ${
                        on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="overflow-hidden rounded-2xl border border-line bg-cream">
                          <div className="relative aspect-[16/10] w-full">
                            <Image src={q.img} alt="" fill sizes="100vw" className="object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-ink/55 to-transparent" />
                            <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-cream text-[#1f6f96]">
                              <Icon className="h-5 w-5" />
                            </span>
                          </div>
                          <p className="p-6 leading-relaxed text-ink-soft">{q.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* desktop answer panel */}
          <Reveal variant="up" delay={0.1} className="hidden lg:block">
            <div className="lg:sticky lg:top-24">
              <div key={active} className="t-in overflow-hidden rounded-3xl border border-line bg-cream">
                <div className="relative aspect-[16/10] w-full">
                  <Image src={f.img} alt="" fill sizes="50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/55 to-transparent" />
                  <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-cream text-[#1f6f96] shadow-lg">
                    <ActiveIcon className="h-6 w-6" />
                  </span>
                </div>
                <div className="p-7 sm:p-9">
                  <h3 className="display text-2xl text-ink sm:text-3xl">{f.q}</h3>
                  <p className="mt-4 leading-relaxed text-ink-soft">{f.a}</p>
                </div>
              </div>

              <p className="mt-6 text-sm text-ink-soft">
                Still wondering about something?{" "}
                <Link href="/#contact" className="font-semibold text-[#1f6f96] hover:underline">
                  Drop us a line
                </Link>{" "}
                — we&apos;re trekkers, not a call centre.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
