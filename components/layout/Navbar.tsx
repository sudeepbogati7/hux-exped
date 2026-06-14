"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ChevronDown, ArrowIcon } from "@/components/ui/icons";
import { nav } from "@/lib/data";

export default function Navbar({ subpage = false, overDark = false }: { subpage?: boolean; overDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [mega, setMega] = useState<string | null>(null); // open desktop mega-menu

  const pre = subpage ? "/" : "";
  const resolve = (href: string) => (href.startsWith("#") ? `${pre}${href}` : href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || subpage || open;
  // sitting over a dark hero (transparent state) → use light text + inverted logo
  const onDark = overDark && !solid;
  const linkColor = onDark ? "text-cream" : "text-ink";
  const barColor = onDark ? "bg-cream" : "bg-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-line bg-cream/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* announcement bar — visible over the hero, collapses on scroll */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          solid ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="bg-coral text-cream">
          <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-center gap-2.5 px-5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] sm:px-8">
            <span className="hidden sm:inline">Latest news &amp; updates from the Himalaya</span>
            <span className="sm:hidden">Latest news &amp; updates</span>
            <span className="text-cream/50">·</span>
            <Link
              href="/blog"
              className="group/ann inline-flex items-center gap-1 underline-offset-2 hover:underline"
            >
              Read the journal
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/ann:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* left: brand */}
        <Link href={subpage ? "/" : "#top"} className="flex items-center text-ink">
          <Logo className="h-11 sm:h-12" priority invert={onDark} />
        </Link>

        {/* center/right: desktop nav */}
        <div className="hidden items-center gap-5 text-[0.76rem] font-semibold uppercase tracking-[0.1em] lg:flex xl:gap-6 xl:text-[0.78rem] xl:tracking-[0.12em]">
          {nav.map((item, idx) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setMega(item.label)}
                onMouseLeave={() => setMega(null)}
              >
                <Link
                  href={resolve(item.href)}
                  className={`flex items-center gap-1.5 border-b-2 pb-0.5 transition-colors hover:text-coral ${
                    mega === item.label ? `border-coral ${linkColor}` : `border-transparent ${linkColor}`
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${mega === item.label ? "rotate-180" : ""}`} />
                </Link>

                {/* floating mega-menu */}
                <div
                  className={`absolute top-full pt-4 transition-all duration-300 ease-out ${
                    idx >= 3 ? "right-0" : "left-1/2 -translate-x-1/2"
                  } ${mega === item.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
                >
                  <div
                    className={`rounded-2xl border border-white/10 bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ${
                      item.columns === 2 ? "w-[34rem]" : "w-64"
                    }`}
                  >
                    <div className={item.columns === 2 ? "grid grid-cols-2 gap-0.5" : "grid gap-0.5"}>
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={resolve(c.href)}
                          className="group/mi block rounded-xl px-4 py-2.5 transition-all hover:translate-x-0.5 hover:bg-white/[0.07]"
                        >
                          <span className="block text-[0.9rem] font-semibold normal-case leading-tight tracking-normal text-cream transition-colors group-hover/mi:text-coral">
                            {c.label}
                          </span>
                          {c.note && (
                            <span className="mt-0.5 block text-[0.74rem] font-normal normal-case tracking-normal text-cream/45">
                              {c.note}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    {item.cta && (
                      <div className="mt-1.5 border-t border-white/10 px-1.5 pt-2.5">
                        <Link
                          href={item.cta.href}
                          className="group/cta inline-flex w-fit items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral-dark"
                        >
                          {item.cta.label}
                          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={resolve(item.href)}
                className={`border-b-2 border-transparent pb-0.5 transition-colors hover:border-coral hover:text-coral ${linkColor}`}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        {/* right: login + mobile toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/login"
            className={`rounded-full px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
              onDark ? "bg-cream text-ink hover:bg-coral hover:text-cream" : "bg-ink text-cream hover:bg-coral"
            }`}
          >
            Login
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-6 w-7 flex-col justify-center gap-[5px] lg:hidden"
          >
            <span className={`h-[2px] w-full ${barColor} transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-full ${barColor} transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-full ${barColor} transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* mobile slide-down panel */}
      <div className={`overflow-y-auto border-line bg-cream/95 backdrop-blur-md transition-[max-height] duration-500 lg:hidden ${open ? "max-h-[80vh] border-b" : "max-h-0"}`}>
        <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-5 py-6 sm:px-8">
          {nav.map((item) => (
            <div key={item.label}>
              <Link
                href={resolve(item.href)}
                onClick={() => setOpen(false)}
                className="display block py-2 text-2xl text-ink transition-colors hover:text-coral"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mb-2 ml-1 flex flex-col gap-1 border-l border-line pl-4">
                  {item.children.map((c) => (
                    <Link
                      key={c.label}
                      href={resolve(c.href)}
                      onClick={() => setOpen(false)}
                      className="py-1 text-sm font-semibold text-ink-soft transition-colors hover:text-coral"
                    >
                      {c.label}
                    </Link>
                  ))}
                  {item.cta && (
                    <Link
                      href={item.cta.href}
                      onClick={() => setOpen(false)}
                      className="mt-1 inline-flex w-fit items-center gap-2 py-1 text-sm font-semibold text-coral"
                    >
                      {item.cta.label} <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-4 w-fit rounded-full bg-ink px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
