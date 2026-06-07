"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";
import Showreel from "@/components/ui/Showreel";
import { ArrowIcon, CameraIcon } from "@/components/ui/icons";
import { galleryPhotos, INSTAGRAM_URL } from "@/lib/data";

/** L-shaped corner brackets that draw in on hover. */
function Frame() {
  const base = "pointer-events-none absolute h-6 w-6 border-coral opacity-0 transition-all duration-500 group-hover:opacity-100";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l-2 border-t-2 group-hover:left-4 group-hover:top-4`} />
      <span className={`${base} right-3 top-3 border-r-2 border-t-2 group-hover:right-4 group-hover:top-4`} />
      <span className={`${base} bottom-3 left-3 border-b-2 border-l-2 group-hover:bottom-4 group-hover:left-4`} />
      <span className={`${base} bottom-3 right-3 border-b-2 border-r-2 group-hover:bottom-4 group-hover:right-4`} />
    </>
  );
}

export default function Gallery() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".g-item");
      gsap.set(items, { autoAlpha: 0, y: 50, scale: 0.96 });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // first 9 photos preview the gallery on the home page
  const preview = galleryPhotos.slice(0, 9);

  return (
    <section id="gallery" ref={root} className="paper py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-line pb-12 md:flex-row md:items-end">
          <Reveal variant="up">
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <CameraIcon className="h-4 w-4 text-coral" /> The gallery
            </p>
            <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">
              From the field
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral"
              >
                View full gallery
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold uppercase tracking-[0.14em] text-ink ulink"
              >
                Follow on Instagram
              </a>
            </div>
          </Reveal>
        </div>

        {/* showreel */}
        <Reveal variant="fade" className="mt-12">
          <Showreel />
        </Reveal>

        {/* framed masonry */}
        <div className="mt-5 columns-2 gap-5 sm:columns-3 [&>*]:mb-5">
          {preview.map((p, i) => (
            <Link
              key={p.src}
              href="/gallery"
              className="g-item group relative block break-inside-avoid overflow-hidden rounded-sm bg-cream-deep"
            >
              <div className={`relative w-full ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                />
              </div>
              <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
              <Frame />
              {i === preview.length - 1 && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/55 text-center text-cream backdrop-blur-[1px]">
                  <span className="display text-2xl">
                    +{galleryPhotos.length - preview.length} more
                  </span>
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
