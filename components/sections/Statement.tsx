"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { art } from "@/lib/data";

/**
 * Post-hero statement: the cloudy-peak photo full-bleed with a parallax +
 * line-reveal of the brand positioning (off-beat / the real, unseen Nepal).
 * Fades to cream top & bottom so it joins the cream sections seamlessly.
 */
export default function Statement() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".st-img",
        { yPercent: -12, scale: 1.18 },
        {
          yPercent: 10,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from(".st-line", {
        yPercent: 120,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
      gsap.from(".st-rule", {
        scaleX: 0,
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      });
      gsap.from(".st-sub", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        scrollTrigger: { trigger: root.current, start: "top 45%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative -mt-[8vh] h-[112vh] overflow-hidden bg-ink text-cream">
      <div className="st-img absolute inset-x-0 -inset-y-[14%]">
        <Image src={art.cloudy} alt="Cloud-wrapped Himalayan peak" fill sizes="100vw" className="object-cover object-center grayscale" />
      </div>
      {/* contrast + cream blends top/bottom */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink/85 via-ink/40 to-ink/10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-linear-to-b from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] bg-linear-to-t from-cream to-transparent" />

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 sm:px-8">
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
