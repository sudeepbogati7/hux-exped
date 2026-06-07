"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type Variant = "up" | "fade" | "mask";

/**
 * Scroll-triggered entrance. Renders visible by default (no-JS / reduced
 * motion fallback) and only hides->reveals when GSAP runs.
 */
export default function Reveal({
  children,
  as,
  variant = "up",
  delay = 0,
  y = 40,
  className,
  start = "top 85%",
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  y?: number;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const from: gsap.TweenVars =
        variant === "fade"
          ? { autoAlpha: 0 }
          : variant === "mask"
            ? { autoAlpha: 0, yPercent: 12, clipPath: "inset(0 0 100% 0)" }
            : { autoAlpha: 0, y };

      gsap.set(el, from);
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        clipPath: variant === "mask" ? "inset(0 0 0% 0)" : undefined,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [variant, delay, y, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
