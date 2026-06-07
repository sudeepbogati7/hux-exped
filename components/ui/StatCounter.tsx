"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Count-up stat. anime.js drives the number; GSAP ScrollTrigger fires it
 * once when the element scrolls into view.
 */
export default function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = numRef.current;
    if (!node) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      node.textContent = `${value}${suffix}`;
      return;
    }

    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: node,
      start: "top 90%",
      once: true,
      onEnter: () => {
        animate(obj, {
          v: value,
          duration: 1800,
          ease: "out(4)",
          onUpdate: () => {
            node.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      },
    });

    return () => st.kill();
  }, [value, suffix]);

  return (
    <div>
      <span
        ref={numRef}
        className="display block text-4xl text-ink sm:text-5xl"
      >
        0{suffix}
      </span>
      <span className="mt-2 block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
    </div>
  );
}
