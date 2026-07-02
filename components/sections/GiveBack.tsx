import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { UsersIcon, ShieldIcon, HeartIcon } from "@/components/ui/icons";
import { giveBack, photos } from "@/lib/data";

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
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          {/* photo */}
          <Reveal variant="mask" className="relative min-h-[20rem] overflow-hidden rounded-3xl lg:min-h-full">
            <Image
              src={photos.khumbu}
              alt="A Himalayan valley and the communities we trek through"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream/90">
              5% of every booking · back into the valleys
            </p>
          </Reveal>

          {/* content */}
          <Reveal variant="up">
            <p className="eyebrow mb-4 inline-flex items-center gap-2">
              <HeartIcon className="h-4 w-4 text-[#1f6f96]" /> {giveBack.eyebrow}
            </p>
            <h2 className="display text-4xl text-ink sm:text-5xl">
              Nepal first, <span className="text-[#1f6f96]">always.</span>
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">{giveBack.body[0]}</p>

            <div className="mt-8 space-y-3">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} variant="up" delay={0.08 + (i % 3) * 0.07}>
                    <div className="flex items-start gap-4 rounded-2xl border border-line bg-cream p-5 transition-colors hover:border-coral">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-cream">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="display text-lg text-ink">{p.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
