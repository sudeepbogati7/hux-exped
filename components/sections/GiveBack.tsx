import Reveal from "@/components/ui/Reveal";
import { UsersIcon, ShieldIcon, HeartIcon } from "@/components/ui/icons";
import { giveBack } from "@/lib/data";

const pillars = [
  {
    icon: UsersIcon,
    title: "Village schools",
    text: "We help fund classrooms and teachers in the valleys our treks pass through.",
  },
  {
    icon: ShieldIcon,
    title: "Health posts",
    text: "Support for remote community clinics, so the places that host us stay well.",
  },
  {
    icon: HeartIcon,
    title: "Built into the price",
    text: "A share of every booking, given locally — no upsell, no fine print.",
  },
];

export default function GiveBack() {
  return (
    <section id="give-back" className="bg-cream-deep py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        {/* intro */}
        <Reveal variant="up">
          <p className="eyebrow mb-4 inline-flex items-center gap-2">
            <HeartIcon className="h-4 w-4 text-coral" /> {giveBack.eyebrow}
          </p>
          <h2 className="display text-4xl text-ink sm:text-5xl">
            Nepal first, <span className="text-coral">always.</span>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-ink-soft">{giveBack.body[0]}</p>
        </Reveal>

        {/* compact cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} variant="up" delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-cream p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-cream">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="display mt-5 text-lg text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
