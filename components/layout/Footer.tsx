import Image from "next/image";
import Logo from "@/components/ui/Logo";
import Newsletter from "@/components/layout/Newsletter";
import { socialIcon } from "@/components/ui/icons";
import { navLinks, certifications } from "@/lib/data";

const social = ["Instagram", "YouTube", "Facebook", "Strava"];

export default function Footer() {
  return (
    <>
    {/* newsletter */}
    <Newsletter />

    {/* travel associations & certifications — seamless marquee */}
    <section className="border-t border-line bg-cream py-14 sm:py-16">
      <p className="eyebrow mb-10 text-center text-muted">Travel associations &amp; certifications</p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <div className="marquee-track flex w-max items-start gap-x-12 sm:gap-x-16">
          {[...certifications, ...certifications].map((c, i) => (
            <div key={`${c.name}-${i}`} className="flex w-28 shrink-0 flex-col items-center text-center">
              <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white p-2.5 ring-1 ring-line/60">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="mt-3 text-[0.66rem] font-semibold uppercase leading-tight tracking-[0.12em] text-muted">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        {/* big wordmark */}
        <div className="flex items-center justify-between gap-6 border-b border-cream/15 pb-12">
          <Logo invert className="h-20 sm:h-28" />
          <a href="#top" className="hidden shrink-0 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream/60 transition-colors hover:text-[#6b8e1f] sm:inline">
            Back to top ↑
          </a>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <p className="text-sm leading-relaxed text-cream/70">
              Small-group expeditions into Nepal&apos;s offbeat Himalaya. A part
              of every trek funds village schools &amp; health posts in the
              valleys we walk.
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-cream/50">Explore</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href.startsWith("#") ? `/${l.href}` : l.href} className="text-cream/80 hover:text-[#6b8e1f]">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-cream/50">Follow</h4>
            <ul className="space-y-3 text-sm">
              {social.map((s) => {
                const Icon = socialIcon[s];
                return (
                  <li key={s}>
                    <a href="#" className="group inline-flex items-center gap-3 text-cream/80 hover:text-[#6b8e1f]">
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 transition-colors group-hover:border-coral">
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                      </span>
                      {s}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-cream/50">Get in touch</h4>
            <p className="text-sm text-cream/80">Offbeat Himalaya · Nepal</p>
            <p className="mt-2 text-sm text-cream/80">hello@huxexped.com</p>
            <a href="#" className="mt-6 inline-block rounded-full bg-coral px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark">
              Plan a trip
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-cream/15 pt-8 text-[0.72rem] uppercase tracking-[0.14em] text-cream/45 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} HUX EXPED — Demo build</span>
          <span>Made in the Himalaya · Frontend showcase</span>
        </div>
      </div>
    </footer>
    </>
  );
}
