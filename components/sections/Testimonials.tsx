import Reveal from "@/components/ui/Reveal";
import { testimonials, type Testimonial } from "@/lib/data";

const edgeFade = {
  WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
  maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
};

function Card({ t, i }: { t: Testimonial; i: number }) {
  // padded slot guarantees the gap between cards regardless of flex quirks
  return (
    <div style={{ flex: "0 0 auto" }} className="w-[300px] px-3 sm:w-[396px]">
      <figure
        style={{ ["--beam-delay" as string]: `${-i * 0.8}s` }}
        className="beam relative flex h-full min-h-[240px] flex-col justify-between rounded-2xl border border-white/10 bg-[#1e1e1e] p-6 sm:p-7"
      >
        <blockquote className="text-[0.9rem] leading-relaxed text-cream/90 sm:text-[0.95rem]">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral text-sm font-semibold text-cream">
            {t.initials}
          </span>
          <span>
            <span className="block text-sm font-semibold text-cream">{t.name}</span>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream/50">
              {t.trek}
            </span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export default function Testimonials() {
  // duplicate the list once so the -50% marquee loops seamlessly
  const loop = testimonials.concat(testimonials);

  return (
    <section className="overflow-hidden bg-ink py-24 text-cream sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal variant="up">
            <p className="eyebrow mb-5 text-cream/50">Trekkers</p>
            <h2 className="display text-4xl sm:text-7xl">
              What the
              <br />
              rope team <span className="text-coral">says</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-sm leading-relaxed text-cream/70 lg:pb-2">
              Real words from people who walked the long way round with us —
              and would do it again tomorrow.
            </p>
          </Reveal>
        </div>
      </div>

      {/* single infinite-scrolling row */}
      <div className="mt-14 sm:mt-16" style={edgeFade}>
        <div className="marquee-track flex w-max" style={{ animationDuration: "60s" }}>
          {loop.map((t, i) => (
            <Card key={i} t={t} i={i % testimonials.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
