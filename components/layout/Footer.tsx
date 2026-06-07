import Logo from "@/components/ui/Logo";
import { socialIcon } from "@/components/ui/icons";
import { navLinks } from "@/lib/data";

const social = ["Instagram", "YouTube", "Facebook", "Strava"];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        {/* big wordmark */}
        <div className="flex items-end justify-between gap-6 border-b border-cream/15 pb-12">
          <div className="flex items-center gap-4">
            <Logo className="h-12 w-16 text-cream" />
            <span className="display text-5xl tracking-tight sm:text-7xl">HUX EXPED</span>
          </div>
          <a href="#top" className="hidden shrink-0 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream/60 transition-colors hover:text-coral sm:inline">
            Back to top ↑
          </a>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <p className="text-sm leading-relaxed text-cream/70">
              Small-group expeditions into Nepal&apos;s offbeat Himalaya. A part
              of every trek funds men&apos;s mental health.
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-cream/50">Explore</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream/80 hover:text-coral">{l.label}</a>
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
                    <a href="#" className="group inline-flex items-center gap-3 text-cream/80 hover:text-coral">
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
            <p className="text-sm text-cream/80">Thamel, Kathmandu</p>
            <p className="mt-2 text-sm text-cream/80">hello@huxexped.com</p>
            <a href="#" className="mt-6 inline-block rounded-full bg-coral px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark">
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
  );
}
