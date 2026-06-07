"use client";

import { useRef, useState } from "react";
import ParticleField from "@/components/ui/ParticleField";
import { PlayIcon } from "@/components/ui/icons";
import { showreel } from "@/lib/data";

/**
 * Showreel hero: poster image + drifting Three.js dust + a custom play
 * control. Drop the finished film at /public/gallery/showreel.mp4 and it
 * plays in place; until then the poster + particles stand in gracefully.
 */
export default function Showreel({ className = "" }: { className?: string }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-ink ${className}`}>
      {/* poster / video */}
      <video
        ref={vid}
        poster={showreel.poster}
        preload="none"
        playsInline
        controls={playing}
        onEnded={() => setPlaying(false)}
        className="aspect-video h-full w-full object-cover"
      >
        <source src={showreel.src} type="video/mp4" />
      </video>

      {/* particle dust + overlays (hidden once the film is rolling) */}
      {!playing && (
        <>
          <ParticleField className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-ink/40" />

          {/* corner frame */}
          <span className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-cream/40" />
          <span className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r-2 border-t-2 border-cream/40" />
          <span className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b-2 border-l-2 border-cream/40" />
          <span className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-cream/40" />

          <button
            onClick={toggle}
            aria-label="Play showreel"
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-cream"
          >
            <span className="grid h-20 w-20 place-items-center rounded-full bg-coral/90 backdrop-blur transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
              <PlayIcon className="h-8 w-8 translate-x-0.5" />
            </span>
            <span className="text-center">
              <span className="display block text-2xl sm:text-3xl">{showreel.title}</span>
              <span className="mt-1 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/60">
                {showreel.meta}
              </span>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
