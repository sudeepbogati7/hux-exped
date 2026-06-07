"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="paper py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal variant="up">
            <p className="eyebrow mb-5">Good to know</p>
            <h2 className="display text-5xl text-ink sm:text-6xl">
              Frequently
              <br />
              asked
            </h2>
            <p className="mt-6 max-w-xs leading-relaxed text-ink-soft">
              Still wondering about something? Drop us a line —
              we&apos;re trekkers, not a call centre.
            </p>
          </Reveal>

          <Reveal variant="up" delay={0.1}>
            <div className="border-t border-line">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q} className="border-b border-line">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="display text-xl text-ink sm:text-2xl">
                        {f.q}
                      </span>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-lg transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-coral bg-coral text-cream"
                            : "border-line text-ink"
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-400 ease-out-expo ${
                        isOpen ? "grid-rows-[1fr] pb-7 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl leading-relaxed text-ink-soft">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
