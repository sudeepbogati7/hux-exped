import Reveal from "@/components/ui/Reveal";
import { HeartIcon, UsersIcon, MountainIcon } from "@/components/ui/icons";
import { giveBack } from "@/lib/data";

const pillars = [
  {
    icon: UsersIcon,
    title: "Surfing for Farmers",
    text: "We run a charity getting farmers out of isolation and into the sea. Same idea as the mountains — different terrain.",
  },
  {
    icon: MountainIcon,
    title: "The mountains heal",
    text: "Time in the high places has done a lot for our own mental health, and we've watched it do the same for the people we walk with.",
  },
  {
    icon: HeartIcon,
    title: "Built into the price",
    text: "A portion of every booking goes straight to mental-health charities. No upsell, no fine print — it's simply how we work.",
  },
];

export default function GiveBack() {
  return (
    <section id="give-back" className="bg-cream-deep py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* heading */}
        <Reveal variant="up" className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5 inline-flex items-center gap-2">
            <HeartIcon className="h-4 w-4 text-coral" /> {giveBack.eyebrow}
          </p>
          <h2 className="display text-4xl text-ink sm:text-5xl lg:text-6xl">
            Why we <span className="text-coral">give back</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink">
            {giveBack.body[0]}
          </p>
        </Reveal>

        {/* pillars */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} variant="up" delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-cream p-8">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-cream">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="display mt-6 text-2xl text-ink">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* impact + quote */}
        <Reveal variant="fade" delay={0.1}>
          <div className="mt-12 grid items-center gap-8 rounded-3xl bg-ink p-8 text-cream sm:p-12 lg:grid-cols-[1fr_auto] lg:gap-14">
            <div>
              <p className="display text-2xl leading-snug sm:text-3xl">
                &ldquo;Getting outside and doing something hard with good people
                works. <span className="text-coral">We&apos;ve seen it.</span>&rdquo;
              </p>
              <p className="mt-4 text-sm text-cream/60">
                A portion of every booking funds mental-health charities, including {giveBack.charity}.
              </p>
            </div>
            <div className="flex gap-8 border-t border-cream/15 pt-6 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <div>
                <div className="display text-4xl text-coral sm:text-5xl">5%</div>
                <div className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/50">Of every booking</div>
              </div>
              <div>
                <div className="display text-4xl text-cream sm:text-5xl">100%</div>
                <div className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/50">Crew paid fairly</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
