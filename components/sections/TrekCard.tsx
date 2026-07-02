"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowIcon } from "@/components/ui/icons";
import type { Trek } from "@/lib/data";

export default function TrekCard({
  trek,
  flip,
  upcoming,
}: {
  trek: Trek;
  flip?: boolean;
  upcoming?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const href = `/treks/${trek.slug}`;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tc-img",
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className={`group grid items-stretch gap-8 lg:grid-cols-2 lg:gap-16 ${
        flip ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* image frame */}
      <Link href={href} className="relative block overflow-hidden rounded-sm lg:h-full">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-deep sm:aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[34rem]">
          <div className="tc-img absolute inset-x-0 -inset-y-[14%]">
            <Image
              src={trek.image}
              alt={`${trek.name}, Nepal`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
            />
          </div>
          <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur">
            {trek.meta}
          </span>
          <span className="absolute right-5 top-5 rounded-full bg-coral px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink">
            {trek.price}
          </span>
          {upcoming && (
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-coral motion-safe:animate-pulse" /> Next departure
            </span>
          )}
        </div>
      </Link>

      {/* text */}
      <div className={flip ? "lg:order-1" : ""}>
        {upcoming && (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#1f6f96]">
            <span className="h-1.5 w-1.5 rounded-full bg-coral motion-safe:animate-pulse" /> Departing soon
          </p>
        )}
        <p className="eyebrow">{trek.region}</p>
        <h3 className="display mt-3 text-5xl text-ink sm:text-6xl lg:text-7xl">{trek.name}</h3>
        <p className="mt-6 max-w-md leading-relaxed text-ink-soft">{trek.blurb}</p>

        <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
          {[
            ["Duration", trek.days],
            ["Max altitude", trek.altitude],
            ["Grade", trek.grade],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{k}</dt>
              <dd className="display mt-1 text-xl text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {/* trail gallery */}
        <div className="mt-8 flex items-center gap-3">
          {trek.gallery.slice(0, 2).map((src, i) => (
            <Link
              href={href}
              key={src}
              className="group/th relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-sm bg-cream-deep sm:w-28"
            >
              <Image
                src={src}
                alt={`${trek.name} — view ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-500 group-hover/th:scale-105"
              />
            </Link>
          ))}
          <span className="text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.14em] text-muted">
            From<br />the trail
          </span>
        </div>

        <Link
          href={href}
          className="group/btn mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink"
        >
          <span className="ulink">View expedition</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover/btn:translate-x-1">
            <ArrowIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
