import type { ReactElement } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ShieldIcon, StarIcon } from "@/components/ui/icons";

type Stat = {
  value: string;
  unit?: string;
  label: string;
  img?: string;
  Icon?: (p: { className?: string }) => ReactElement;
};

const stats: Stat[] = [
  { img: "/hiking-icon.png", value: "10", unit: "max", label: "Trekkers per group" },
  { img: "/experience-icon.png", value: "19+", label: "Years on the trail" },
  { Icon: ShieldIcon, value: "100%", label: "Licensed local guides" },
  { Icon: StarIcon, value: "4.9", unit: "★", label: "Average rating" },
  { img: "/donation-icon.png", value: "5%", label: "To Nepal schools" },
];

export default function Stats() {
  return (
    <section className="paper relative overflow-hidden py-16 sm:py-20">
      {/* faint mountain range backdrop (transparent PNG) */}
      <Image
        src="/mountain3.png"
        alt=""
        width={2400}
        height={1600}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full opacity-[0.07] grayscale"
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} variant="up" delay={(i % 5) * 0.08} className="flex flex-col items-center text-center">
              {/* fixed-height icon box so every value lines up regardless of icon shape */}
              <span className="flex h-20 items-center justify-center sm:h-24">
                {s.Icon ? (
                  <s.Icon className="h-14 w-14 text-ink sm:h-16 sm:w-16" />
                ) : (
                  <Image
                    src={s.img!}
                    alt=""
                    width={96}
                    height={96}
                    aria-hidden
                    className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                  />
                )}
              </span>
              <div className="mt-5 flex h-12 items-baseline justify-center gap-1.5">
                <span className="display text-4xl text-ink sm:text-5xl">{s.value}</span>
                {s.unit && (
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">{s.unit}</span>
                )}
              </div>
              <span className="mt-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
