"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { testimonials, photos } from "@/lib/data";

export default function Testimonials({ id = "testimonials" }: { id?: string } = {}) {
  const base = testimonials;
  const n = base.length;
  const list = [...base, ...base, ...base]; // 3 copies → seamless loop with neighbours
  const START = n;

  const [i, setI] = useState(START);
  const [anim, setAnim] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);

  // measure container
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setCw(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // auto-advance (right → left)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((p) => p + 1), 3200);
    return () => clearInterval(t);
  }, []);

  // seamless wrap: snap by one set without animation when out of the middle band
  useEffect(() => {
    if (i >= 2 * n || i < n) {
      const t = setTimeout(() => {
        setAnim(false);
        setI((p) => (p >= 2 * n ? p - n : p + n));
      }, 660);
      return () => clearTimeout(t);
    }
  }, [i, n]);

  useEffect(() => {
    if (!anim) {
      const r = requestAnimationFrame(() => setAnim(true));
      return () => cancelAnimationFrame(r);
    }
  }, [anim]);

  const cardW = cw ? Math.min(560, Math.max(260, cw * 0.78)) : 320;
  const gap = 28;
  const step = cardW + gap;
  const offset = cw / 2 - (i * step + cardW / 2);

  const go = (d: number) => {
    setAnim(true);
    setI((p) => p + d);
  };
  const activeDot = (((i - START) % n) + n) % n;

  return (
    <section id={id} className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32 lg:py-36">
      <Image src={photos.nightSky} alt="" fill sizes="100vw" className="object-cover opacity-[0.1] grayscale" />
      <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/90 to-ink" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal variant="up" className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5 text-cream/50">Trekkers</p>
          <h2 className="display text-4xl sm:text-6xl">
            What the rope team <span className="text-[#1f6f96]">says</span>
          </h2>
        </Reveal>
      </div>

      <div ref={wrapRef} className="relative mt-14 w-full">
        <div
          className="flex items-stretch"
          style={{
            transform: `translateX(${offset}px)`,
            transition: anim ? "transform 0.65s cubic-bezier(0.16,1,0.3,1)" : "none",
          }}
        >
          {list.map((t, k) => {
            const active = k === i;
            return (
              <figure
                key={k}
                style={{ width: cardW, marginRight: gap }}
                className={`shrink-0 self-center rounded-3xl border p-7 transition-all duration-500 sm:p-9 ${
                  active
                    ? "scale-100 border-white/12 bg-[#1e1e1e] opacity-100 blur-0"
                    : "scale-[0.9] border-white/5 bg-[#161616] opacity-40 blur-[3px]"
                }`}
              >
                <blockquote className={`leading-relaxed text-cream ${active ? "text-lg sm:text-xl" : "text-base"}`}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral text-sm font-semibold text-ink">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-cream">{t.name}</span>
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream/50">
                      {t.trek}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream transition-colors hover:border-coral hover:bg-coral hover:text-ink"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {base.map((_, k) => (
            <button
              key={k}
              onClick={() => { setAnim(true); setI(START + k); }}
              aria-label={`Go to testimonial ${k + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeDot === k ? "w-6 bg-coral" : "w-1.5 bg-cream/25 hover:bg-cream/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream transition-colors hover:border-coral hover:bg-coral hover:text-ink"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
