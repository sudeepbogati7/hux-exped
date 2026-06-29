"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import HeroSearch from "@/components/ui/HeroSearch";
import { art } from "@/lib/data";

/**
 * Hero (no pin):
 *   z0  — mountain3 faint full-width BACKGROUND (slight parallax)
 *   z10 — header text
 *   z20 — mountain1 single PRIMARY peak, climbs on scroll & covers the text
 *   z22 — cloud2 clouds (mix-blend-screen) banked at the base + smoothing
 *         the seam into the next section
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const clouds = Array.from({ length: 34 });

  const peakMask = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%), linear-gradient(to top, transparent 0, #000 18%, #000 100%)",
    maskImage:
      "linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%), linear-gradient(to top, transparent 0, #000 18%, #000 100%)",
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect" as const,
  };
  // background range: feather sides + fade its lower half so only the upper
  // peaks float high above the primary peak (clear gap, no muddy overlap)
  const bgMask = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent), linear-gradient(to top, transparent 0, #000 55%, #000 100%)",
    maskImage:
      "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent), linear-gradient(to top, transparent 0, #000 55%, #000 100%)",
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect" as const,
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-bg-mtn", { autoAlpha: 0, yPercent: 10, duration: 1.5 }, 0.2)
        .from(".hero-eyebrow", { autoAlpha: 0, y: 18, duration: 0.6 }, 0.35)
        .from(".hero-line", { yPercent: 115, duration: 1.0, stagger: 0.1 }, 0.45)
        .from(".hero-para", { autoAlpha: 0, y: 24, duration: 0.8 }, 0.75)
        .from(".hero-search", { autoAlpha: 0, y: 24, duration: 0.8 }, 0.9)
        .from(".hero-mtn", { yPercent: 14, autoAlpha: 0, duration: 1.4, ease: "power3.out" }, 0.55)
        .from(".hero-clouds", { autoAlpha: 0, duration: 1.4 }, 0.9);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      // bg, primary peak AND clouds all rise together → the cloud bank stays
      // glued to the base of the primary peak as it climbs and covers the text
      tl.to(".hero-bg-mtn", { yPercent: -34, ease: "none" }, 0)
        .to(".hero-mtn", { yPercent: -34, ease: "none" }, 0)
        .to(".hero-clouds", { yPercent: -34, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative isolate h-screen overflow-hidden bg-cream">
      {/* mountain3 — faint background range, floating high above the primary */}
      <div style={bgMask} className="hero-bg-mtn absolute inset-x-0 bottom-[13vh] z-0 opacity-[0.22] blur-[2px]">
        <Image src={art.peaks[2]} alt="" width={2400} height={1600} sizes="100vw" className="h-auto w-full grayscale" priority />
      </div>

      {/* header content — anchored high & fixed so the peaks never cover it at rest */}
      <div className="absolute inset-0 z-10">
        <div className="mx-auto flex h-full max-w-[1400px] flex-col px-5 pt-[19vh] sm:px-8 sm:pt-[17vh] lg:pt-[18vh]">
          <p className="hero-eyebrow eyebrow mb-5 inline-flex items-center gap-2 sm:mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" /> Restricted trails · <span className="text-[#6b8e1f]">Real Himalaya</span>
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <h1 className="display text-ink">
              <span className="block overflow-hidden">
                <span className="hero-line block text-[19vw] leading-[0.82] sm:text-[13vw] lg:text-[8.5rem]">Beyond</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block text-[19vw] leading-[0.82] sm:text-[13vw] lg:text-[8.5rem]">the <span className="text-[#6b8e1f]">trail</span></span>
              </span>
            </h1>
            <p className="hero-para max-w-sm text-[0.95rem] leading-relaxed text-ink-soft sm:text-[0.98rem] lg:pt-4">
              HUX EXPED leads small groups into Nepal&apos;s wildest,
              least-trodden mountains — not Everest Base Camp, but{" "}
              <span className="ulink">Kanchenjunga</span> and{" "}
              <span className="ulink">Dolpo</span>, where the map runs out.
            </p>
          </div>

          <div className="hero-search mt-9 max-w-xl">
            <HeroSearch />
          </div>
        </div>
      </div>

      {/* PRIMARY peak — single image, climbs & covers content */}
      <div style={peakMask} className="hero-mtn pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <Image src={art.peaks[0]} alt="Himalayan peaks" width={2400} height={1350} priority sizes="100vw" className="h-auto w-full grayscale contrast-[1.04]" />
      </div>

      {/* cream blend dissolving the peak base into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[21] h-[22vh] bg-linear-to-t from-cream via-cream/75 to-transparent" />

      {/* white clouds — dense bank, slow single-direction drift (right → left) */}
      <div className="hero-clouds pointer-events-none absolute inset-x-0 bottom-0 z-[22] h-[38vh]">
        <div className="fog-track absolute -bottom-4 flex w-max items-end opacity-100" style={{ animationDuration: "560s" }}>
          {clouds.concat(clouds).map((_, i) => (
            <div key={i} className="relative -mr-[22rem] h-[200px] w-[540px] shrink-0 sm:h-[300px] sm:w-[820px]">
              <Image src={art.fog} alt="" fill sizes="820px" className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute inset-x-0 bottom-7 z-30 mx-auto flex max-w-[1400px] items-center justify-between px-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/55 sm:px-8">
        <span>Scroll to ascend</span>
        <span className="hidden sm:inline">3,000m → 8,167m</span>
      </div>
    </section>
  );
}
