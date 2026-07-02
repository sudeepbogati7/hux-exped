"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { ArrowIcon, FacebookIcon, InstagramIcon, WhatsappIcon, MailIcon, TripadvisorIcon } from "@/components/ui/icons";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { childIcon, topIcon } from "@/components/layout/navIcons";
import PersonalizeTrip from "@/components/ui/PersonalizeTrip";
import AccountMenu from "@/components/layout/AccountMenu";
import MobileAuth from "@/components/layout/MobileAuth";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/data";

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}`, Icon: WhatsappIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: MailIcon },
  { label: "Tripadvisor", href: "https://tripadvisor.com", Icon: TripadvisorIcon },
];

const topLinks = [
  { label: "News & Events", href: "/blog" },
  { label: "FAQs", href: "/#faq" },
];

export default function Navbar({ subpage = false, overDark = false }: { subpage?: boolean; overDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer

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
          solid ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
        }`}
      >
        <div className="bg-ink text-cream">
          <div className="mx-auto flex h-11 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-12 sm:px-8">
            {/* socials — left */}
            <div className="flex shrink-0 items-center gap-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-8 w-8 place-items-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-[#1f6f96]"
                >
                  <s.Icon className="h-[17px] w-[17px]" />
                </a>
              ))}
            </div>
            {/* utility links — right */}
            <div className="flex shrink-0 items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] sm:gap-4">
              {topLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="hidden text-cream/75 transition-colors hover:text-cream sm:inline"
                >
                  {l.label}
                </Link>
              ))}
              <span className="hidden h-3 w-px bg-cream/20 sm:inline-block" />
              <PersonalizeTrip />
            </div>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* left: brand */}
        <Link href={subpage ? "/" : "#top"} className="flex items-center text-ink">
          <Logo className="text-2xl sm:text-[1.7rem]" priority invert={onDark} />
        </Link>

        {/* center/right: desktop nav (shadcn NavigationMenu) */}
        <div className="hidden h-full items-center lg:flex">
          <NavigationMenu className="h-full">
            <NavigationMenuList>
              {nav.map((item, idx) => {
                const TopIcon = topIcon[item.label];
                // wide first menu opens leftward; the last two open rightward
                const align = idx === 0 ? "start" : idx >= nav.length - 3 ? "end" : "center";
                return (
                  <NavigationMenuItem key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className={linkColor}>
                          {TopIcon && <TopIcon className="size-4" aria-hidden />}
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent align={align}>
                          <ul className={cn("grid gap-1", item.columns === 2 ? "w-[36rem] grid-cols-2" : "w-72")}>
                            {item.children.map((c) => {
                              const CIcon = c.icon ? childIcon[c.icon] : undefined;
                              return (
                                <li key={c.label}>
                                  <NavigationMenuLink asChild className="hover:bg-white/[0.07] focus:bg-white/[0.07]">
                                    <Link href={resolve(c.href)}>
                                      {CIcon && <CIcon className="size-5 shrink-0 text-cream/60 transition-colors group-hover/mi:text-coral" aria-hidden />}
                                      <span className="flex min-w-0 flex-col gap-0.5">
                                        <span className="text-[0.9rem] font-semibold leading-tight text-cream transition-colors group-hover/mi:text-coral">
                                          {c.label}
                                        </span>
                                        {c.note && (
                                          <span className="text-[0.74rem] font-normal leading-snug text-cream/45">{c.note}</span>
                                        )}
                                      </span>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              );
                            })}
                            {item.cta && (
                              <li className={cn("mt-1.5 border-t border-white/10 px-1 pt-2.5", item.columns === 2 && "col-span-2")}>
                                <Link
                                  href={item.cta.href}
                                  className="group/cta inline-flex w-fit items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-coral-dark"
                                >
                                  {item.cta.label}
                                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                                </Link>
                              </li>
                            )}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), linkColor, "items-center gap-1.5 hover:bg-transparent")}>
                        <Link href={resolve(item.href)}>
                          {TopIcon && <TopIcon className="size-4 shrink-0" aria-hidden />}
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* right: account + mobile toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <AccountMenu onDark={onDark} />
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
          {nav.map((item) => {
            const TopIcon = topIcon[item.label];
            return (
              <div key={item.label}>
                <Link
                  href={resolve(item.href)}
                  onClick={() => setOpen(false)}
                  className="display flex items-center gap-3 py-2 text-2xl text-ink transition-colors hover:text-[#1f6f96]"
                >
                  {TopIcon && <TopIcon className="size-5 text-[#1f6f96]" aria-hidden />}
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mb-2 ml-1 flex flex-col gap-1 border-l border-line pl-4">
                    {item.children.map((c) => {
                      const CIcon = c.icon ? childIcon[c.icon] : undefined;
                      return (
                        <Link
                          key={c.label}
                          href={resolve(c.href)}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2.5 py-1 text-sm font-semibold text-ink-soft transition-colors hover:text-[#1f6f96]"
                        >
                          {CIcon && <CIcon className="size-4 text-muted" aria-hidden />}
                          {c.label}
                        </Link>
                      );
                    })}
                    {item.cta && (
                      <Link
                        href={item.cta.href}
                        onClick={() => setOpen(false)}
                        className="mt-1 inline-flex w-fit items-center gap-2 py-1 text-sm font-semibold text-[#1f6f96]"
                      >
                        {item.cta.label} <ArrowIcon className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <MobileAuth onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
}
