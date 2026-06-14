"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { art } from "@/lib/data";

/**
 * Post-hero statement. The section pins: the text locks in place while a
 * bank of clouds rolls down over it (carrying the hero's clouds onto the
 * statement), then releases into the next section.
 */
export default function Statement() {
  const root = useRef<HTMLDivElement>(null);
  const clouds = Array.from({ length: 12 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // text entrance (once)
      gsap.from(".st-line", {
        yPercent: 120,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      });
      gsap.from(".st-sub", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        scrollTrigger: { trigger: root.current, start: "top 40%" },
      });

      // pin: lock the text, roll the clouds down across it
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=110%", scrub: 0.6, pin: true },
        })
        .fromTo(".st-clouds", { yPercent: -120 }, { yPercent: 130, ease: "none" }, 0)
        .fromTo(".st-img", { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-ink text-cream">
      {/* cloudy peak backdrop */}
      <div className="st-img absolute inset-x-0 -inset-y-[10%]">
        <Image src={art.cloudy} alt="Cloud-wrapped Himalayan peak" fill sizes="100vw" className="object-cover object-center grayscale" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink/85 via-ink/45 to-ink/20" />

      {/* cream merge from the hero (top) + into the next section (bottom) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[26] h-[14vh] bg-linear-to-b from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[18vh] bg-linear-to-t from-cream to-transparent" />

      {/* clouds that roll down over the locked text */}
      <div className="st-clouds pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[55vh] w-max items-start opacity-90">
        {clouds.concat(clouds).map((_, i) => (
          <div key={i} className="relative -mr-40 h-[240px] w-[720px] shrink-0 sm:h-[320px] sm:w-[900px]">
            <Image src={art.fog} alt="" fill sizes="900px" className="object-contain" />
          </div>
        ))}
      </div>

      {/* locked text */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 sm:px-8">
        <p className="st-sub eyebrow mb-6 text-coral">The HUX difference</p>
        <h2 className="display max-w-4xl text-[8vw] leading-[0.92] text-cream sm:text-6xl lg:text-7xl">
          <span className="block overflow-hidden">
            <span className="st-line block">Everyone walks to</span>
          </span>
          <span className="block overflow-hidden">
            <span className="st-line block">Everest Base Camp.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="st-line block text-coral">We walk the other way.</span>
          </span>
        </h2>
        <span className="st-rule mt-8 block h-px w-40 origin-left bg-cream/40" />
        <p className="st-sub mt-8 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
          Most outfits sell the same two trails — Everest Base Camp and
          Annapurna — in &ldquo;basic&rdquo; or &ldquo;luxury.&rdquo; We think
          differently. HUX EXPED exists for the{" "}
          <span className="text-cream">unseen, real Nepal</span>: the restricted
          valleys, rough trails and off-beat paths most travellers never find.
        </p>
      </div>
    </section>
  );
}
