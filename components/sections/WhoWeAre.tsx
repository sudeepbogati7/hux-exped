import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/icons";
import { team } from "@/lib/data";

const stats = [
  { value: "500+", label: "Happy trekkers" },
  { value: "15+", label: "Signature treks" },
  { value: "4.9★", label: "Average rating" },
];

export default function WhoWeAre() {
  return (
    <section id="about" className="overflow-hidden bg-ink py-24 text-cream sm:py-32 lg:py-36">
      <div className="mx-auto grid max-w-[1400px] items-start gap-16 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* left: story + stats + quote */}
        <Reveal variant="up">
          <p className="eyebrow mb-5 inline-flex items-center gap-3 text-cream/50">
            <span className="h-px w-8 bg-coral" /> Who we are
          </p>
          <h2 className="display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Born in the <span className="text-coral">mountains</span>,
            <br />
            built for adventurers.
          </h2>
          <p className="mt-7 max-w-md leading-relaxed text-cream/75">
            Hux Exped is homegrown, not an agency. We&apos;re a family of Nepali
            guides who grew up on these trails — every trek we offer is one
            we&apos;ve walked ourselves, chosen for its beauty, its safety and the
            villages that raised us.
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-cream/60">
            Hundreds have walked with us so far. And we&apos;re just getting
            started.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-cream/15 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="display text-4xl text-coral sm:text-5xl">{s.value}</div>
                <div className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <figure className="mt-10 max-w-md rounded-2xl border border-cream/12 bg-white/[0.03] p-7">
            <blockquote className="text-lg italic leading-relaxed text-cream/90">
              &ldquo;I was terrified it would be too hard — but Deepak paced us
              perfectly. Standing at the pass with tears in my eyes, I understood
              why people keep coming back to Nepal.&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral text-xs font-semibold text-cream">FB</span>
              <span>
                <span className="block text-sm font-semibold text-cream">Felicite Black</span>
                <span className="block text-[0.7rem] uppercase tracking-[0.14em] text-cream/45">Australia · Kanchenjunga, 2023</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* right: team grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {team.map((m, i) => (
            <Reveal key={m.name + m.role} variant="up" delay={(i % 2) * 0.08}>
              <article className="group h-full overflow-hidden rounded-3xl border border-cream/10 bg-white/[0.03] transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-cream/25 hover:bg-white/[0.06] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-cream ring-1 ring-cream/15 backdrop-blur">
                    {m.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="display text-xl leading-tight text-cream">{m.name}</h3>
                  <p className="mt-0.5 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-coral">{m.role}</p>
                  <p className="mt-4 inline-flex items-center gap-2 border-t border-cream/10 pt-4 text-[0.8rem] text-cream/65">
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-coral" /> {m.meta}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}

          <div className="flex items-center justify-center gap-3 rounded-3xl border border-cream/10 bg-white/[0.03] px-6 py-5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cream/60 sm:col-span-2">
            Proudly Nepali
            <span className="h-1 w-1 rounded-full bg-coral" />
            Globally trusted
          </div>
        </div>
      </div>
    </section>
  );
}
