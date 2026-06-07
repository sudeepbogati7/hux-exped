"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/lib/data";

export default function Navbar({ subpage = false }: { subpage?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // on subpages, in-page anchors must route home first
  const pre = subpage ? "/" : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || subpage
          ? "bg-cream/85 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-6 w-7 flex-col justify-center gap-[5px]"
          >
            <span className={`h-[2px] w-full bg-ink transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-full bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-full bg-ink transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
          <div className="hidden items-center gap-7 text-[0.8rem] font-semibold uppercase tracking-[0.14em] md:flex">
            <Link href={`${pre}#treks`} className="ulink">Treks</Link>
            <Link href={`${pre}#about`} className="ulink">About</Link>
          </div>
        </div>

        {/* center: brand */}
        <Link href={subpage ? "/" : "#top"} className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-ink">
          <Logo className="h-7 w-10" />
          <span className="display text-lg tracking-tight">HUX EXPED</span>
        </Link>

        {/* right: utility + auth */}
        <div className="flex items-center gap-5 text-[0.8rem] font-semibold uppercase tracking-[0.14em]">
          <span className="hidden text-muted sm:inline">USD</span>
          <span className="hidden text-muted sm:inline">EN</span>
          <a href="#" className="hidden sm:inline ulink">Login</a>
          <a href="#" className="rounded-full bg-ink px-5 py-2.5 text-cream transition-colors hover:bg-coral">Register</a>
        </div>
      </nav>

      {/* slide-down panel */}
      <div className={`overflow-hidden border-line bg-cream/95 backdrop-blur-md transition-[max-height] duration-500 ${open ? "max-h-96 border-b" : "max-h-0"}`}>
        <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-5 py-6 sm:px-8">
          {navLinks.map((l) => (
            <Link key={l.href} href={`${pre}${l.href}`} onClick={() => setOpen(false)} className="display py-2 text-3xl text-ink transition-colors hover:text-coral">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
