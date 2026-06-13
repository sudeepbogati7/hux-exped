"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowIcon } from "@/components/ui/icons";
import { photos } from "@/lib/data";

/**
 * Variation B hero — full-bleed cinematic video background (Mt Aspiring),
 * dark editorial overlay, content anchored bottom-left.
 */
export default function HeroVideo() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hv-eyebrow", { autoAlpha: 0, y: 20, duration: 0.7 }, 0.2)
        .from(".hv-line", { yPercent: 115, duration: 1.0, stagger: 0.12 }, 0.3)
        .from(".hv-sub", { autoAlpha: 0, y: 24, duration: 0.8 }, 0.7)
        .from(".hv-cta", { autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.9)
        .from(".hv-cue", { autoAlpha: 0, duration: 1 }, 1.1);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative isolate flex h-screen min-h-[640px] items-end overflow-hidden bg-ink text-cream">
      {/* background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={photos.cook}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      >
        <source src="/mount-aspiring.mp4" type="video/mp4" />
      </video>

      {/* legibility overlays */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-ink/55" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink/70 via-transparent to-transparent" />

      {/* content */}
      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-24 lg:pb-28">
        <p className="hv-eyebrow eyebrow mb-6 text-cream/70">Offbeat Nepal · Real Himalaya</p>
        <h1 className="display text-cream">
          <span className="block overflow-hidden">
            <span className="hv-line block text-[15vw] leading-[0.86] sm:text-[11vw] lg:text-[8.5rem]">Walk the</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hv-line block text-[15vw] leading-[0.86] text-coral sm:text-[11vw] lg:text-[8.5rem]">wild side</span>
          </span>
        </h1>
        <p className="hv-sub mt-7 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
          Small-group expeditions into Nepal&apos;s restricted valleys and
          roadless peaks — the mountains the guidebooks forgot, walked the long
          way round.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="#treks"
            className="hv-cta group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark"
          >
            Explore expeditions
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="#contact"
            className="hv-cta rounded-full border border-cream/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm transition-colors hover:bg-cream hover:text-ink"
          >
            Plan your trip
          </Link>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hv-cue absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-[1400px] items-center justify-between px-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream/55 sm:px-8">
        <span>Scroll to ascend</span>
        <span className="hidden sm:inline">Filmed · Mt Aspiring</span>
      </div>
    </section>
  );
}
