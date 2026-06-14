import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { icon: "/hiking-icon.png", value: "10", unit: "max", label: "Trekkers per group" },
  { icon: "/experience-icon.png", value: "19+", label: "Years on the trail" },
  { icon: "/donation-icon.png", value: "5%", label: "To Nepal schools" },
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
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {stats.map((s, i) => {
            return (
              <Reveal key={s.label} variant="up" delay={(i % 3) * 0.1} className="flex flex-col items-center text-center">
                <Image
                  src={s.icon}
                  alt=""
                  width={96}
                  height={96}
                  aria-hidden
                  className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                />
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="display text-4xl text-ink sm:text-5xl">{s.value}</span>
                  {s.unit && <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">{s.unit}</span>}
                </div>
                <span className="mt-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">{s.label}</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
