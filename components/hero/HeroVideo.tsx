"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import Logo from "@/components/ui/Logo";
import HeroSearch from "@/components/ui/HeroSearch";
import { photos } from "@/lib/data";

/**
 * Variation B hero — full-bleed Mt Aspiring video with a single centred-bottom
 * card: logo, heading, search and the upcoming treks. Nothing else.
 */
export default function HeroVideo() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hv-card", { autoAlpha: 0, y: 36, duration: 1, ease: "power3.out", delay: 0.2 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative isolate flex h-screen min-h-[640px] items-end justify-center overflow-hidden bg-ink text-cream">
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
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/80 via-ink/15 to-ink/35" />

      {/* centred-bottom card */}
      <div className="hv-card relative z-10 mb-[9vh] w-full max-w-3xl px-5 sm:px-6">
        <div className="rounded-3xl bg-ink/45 p-6 ring-1 ring-white/10 backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <Logo invert priority className="h-12 shrink-0 sm:h-14" />
            <span className="hidden h-12 w-px bg-cream/20 sm:block" />
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cream/70">The offbeat</p>
              <h1 className="display text-3xl leading-[0.95] text-cream sm:text-4xl">
                Walk the <span className="text-coral">wild side</span>
              </h1>
            </div>
          </div>

          <div className="mt-6">
            <HeroSearch />
          </div>

          <p className="mt-4 text-sm text-cream/75">
            Upcoming treks:{" "}
            <Link href="/treks/dolpo" className="font-semibold text-cream underline-offset-4 hover:text-coral hover:underline">
              Dolpo
            </Link>{" "}
            ·{" "}
            <Link href="/treks/kanchenjunga" className="font-semibold text-cream underline-offset-4 hover:text-coral hover:underline">
              Kanchenjunga
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
