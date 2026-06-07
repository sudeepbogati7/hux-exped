"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { galleryPhotos } from "@/lib/data";

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

export default function GalleryMasonry() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".gm-item");
      gsap.set(items, { autoAlpha: 0, y: 50, scale: 0.96 });
      ScrollTrigger.batch(items, {
        start: "top 94%",
        onEnter: (b) =>
          gsap.to(b, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.06, overwrite: true }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % galleryPhotos.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + galleryPhotos.length) % galleryPhotos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = open === null ? null : galleryPhotos[open];

  return (
    <div ref={root}>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {galleryPhotos.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setOpen(i)}
            className="gm-item group relative block w-full break-inside-avoid overflow-hidden rounded-sm bg-cream-deep"
          >
            <div className={`relative w-full ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
              />
            </div>
            <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
            <Frame />
          </button>
        ))}
      </div>

      {/* lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-10"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-5 top-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/70 hover:text-coral"
          >
            Close ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen((i) => (i! - 1 + galleryPhotos.length) % galleryPhotos.length); }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-coral hover:border-coral sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen((i) => (i! + 1) % galleryPhotos.length); }}
            aria-label="Next"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-coral hover:border-coral sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <figure className="relative max-h-[82vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[78vh] w-full">
              <Image src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 text-center text-sm text-cream/70">{active.alt}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
