"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ChevronDown } from "@/components/ui/icons";
import { nav } from "@/lib/data";

export default function Navbar({ subpage = false }: { subpage?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [mega, setMega] = useState<string | null>(null); // open desktop mega-menu

  // on subpages, in-page anchors must route home first
  const pre = subpage ? "/" : "";
  const resolve = (href: string) => (href.startsWith("#") ? `${pre}${href}` : href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || subpage || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-line bg-cream/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* left: brand */}
        <Link href={subpage ? "/" : "#top"} className="flex items-center text-ink">
          <Logo className="h-11 sm:h-12" priority />
        </Link>

        {/* center/right: desktop nav */}
        <div className="hidden items-center gap-7 text-[0.8rem] font-semibold uppercase tracking-[0.14em] lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setMega(item.label)}
                onMouseLeave={() => setMega(null)}
              >
                <Link
                  href={resolve(item.href)}
                  className={`flex items-center gap-1.5 border-b-2 pb-0.5 transition-colors ${
                    mega === item.label ? "border-coral text-ink" : "border-transparent text-ink hover:text-coral"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${mega === item.label ? "rotate-180" : ""}`} />
                </Link>

                {/* floating mega-menu */}
                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-300 ${
                    mega === item.label ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="w-80 overflow-hidden rounded-2xl border border-white/10 bg-ink p-2 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)]">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={resolve(c.href)}
                        className="group flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                        <span className="normal-case">
                          <span className="block text-[0.95rem] font-semibold tracking-normal text-cream transition-colors group-hover:text-coral">
                            {c.label}
                          </span>
                          {c.note && (
                            <span className="mt-0.5 block text-[0.78rem] font-normal tracking-normal text-cream/45">
                              {c.note}
                            </span>
                          )}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={resolve(item.href)}
                className="border-b-2 border-transparent pb-0.5 text-ink transition-colors hover:border-coral hover:text-coral"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        {/* right: auth + mobile toggle */}
        <div className="flex items-center gap-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] sm:gap-5">
          <Link href="/login" className="hidden text-ink ulink lg:inline">Login</Link>
          <Link href="/register" className="rounded-full bg-ink px-4 py-2 text-cream transition-colors hover:bg-coral sm:px-5 sm:py-2.5">
            Register
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-6 w-7 flex-col justify-center gap-[5px] lg:hidden"
          >
            <span className={`h-[2px] w-full bg-ink transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-full bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-full bg-ink transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* mobile slide-down panel */}
      <div className={`overflow-hidden border-line bg-cream/95 backdrop-blur-md transition-[max-height] duration-500 lg:hidden ${open ? "max-h-[640px] border-b" : "max-h-0"}`}>
        <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-5 py-6 sm:px-8">
          {nav.map((item) => (
            <div key={item.label}>
              <Link
                href={resolve(item.href)}
                onClick={() => setOpen(false)}
                className="display block py-2 text-3xl text-ink transition-colors hover:text-coral"
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
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 flex items-center gap-4 border-t border-line pt-5 text-[0.8rem] font-semibold uppercase tracking-[0.14em]">
            <Link href="/login" onClick={() => setOpen(false)} className="text-ink ulink">Login</Link>
            <Link href="/register" onClick={() => setOpen(false)} className="rounded-full bg-ink px-5 py-2.5 text-cream">Register</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
