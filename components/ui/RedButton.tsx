"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * The reference's signature motif: a coral circle with a small two-line
 * label beside it. Used for "Watch film", "View gallery", etc.
 */
export default function RedButton({
  label,
  icon,
  href = "#",
  className = "",
}: {
  label: ReactNode;
  icon: ReactNode;
  href?: string;
  className?: string;
}) {
  const circle = useRef<HTMLSpanElement>(null);

  const enter = () =>
    gsap.to(circle.current, { scale: 1.12, duration: 0.4, ease: "power3.out" });
  const leave = () =>
    gsap.to(circle.current, { scale: 1, duration: 0.5, ease: "power3.out" });

  return (
    <a
      href={href}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={`group inline-flex items-center gap-4 ${className}`}
    >
      <span
        ref={circle}
        className="grid h-14 w-14 place-items-center rounded-full bg-coral text-ink shadow-[0_10px_30px_-8px_rgba(249,73,47,0.6)] will-change-transform"
      >
        {icon}
      </span>
      <span className="text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.18em] text-ink">
        {label}
      </span>
    </a>
  );
}
