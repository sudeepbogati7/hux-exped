"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon, CameraIcon } from "@/components/ui/icons";
import { galleryImages, INSTAGRAM_URL } from "@/lib/data";

export default function Gallery() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".g-item");
      gsap.set(items, { autoAlpha: 0, y: 40 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={root} className="paper py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-line pb-12 md:flex-row md:items-end">
          <Reveal variant="up">
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <CameraIcon className="h-4 w-4" /> The gallery
            </p>
            <h2 className="display text-5xl text-ink sm:text-7xl">
              From the field
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Follow on Instagram
                <ArrowIcon className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold uppercase tracking-[0.14em] text-ink ulink"
              >
                View all images
              </a>
            </div>
          </Reveal>
        </div>

        {/* masonry */}
        <div className="mt-12 columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
          {galleryImages.map((src, i) => (
            <a
              key={src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="g-item group relative block break-inside-avoid overflow-hidden rounded-sm bg-cream-deep"
            >
              <Image
                src={src}
                alt={`HUX EXPED field photograph ${i + 1}`}
                width={800}
                height={i % 3 === 0 ? 1040 : i % 3 === 1 ? 600 : 800}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
