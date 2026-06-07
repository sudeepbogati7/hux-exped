import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { PeakIcon, MountainIcon, ArrowIcon } from "@/components/ui/icons";
import { peaks6000, peaks7000, photos, type Peak } from "@/lib/data";

function PeakList({
  icon: Icon,
  band,
  label,
  peaks,
}: {
  icon: typeof PeakIcon;
  band: string;
  label: string;
  peaks: Peak[];
}) {
  return (
    <div className="rounded-2xl border border-cream/12 bg-white/[0.03] p-7 sm:p-9">
      <div className="flex items-center gap-4 border-b border-cream/12 pb-6">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-coral text-cream">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <span className="display block text-2xl text-cream">{band}</span>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream/50">
            {label}
          </span>
        </div>
      </div>
      <ul>
        {peaks.map((p) => (
          <li
            key={p.name}
            className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-4 last:border-0"
          >
            <span>
              <span className="block font-semibold text-cream">{p.name}</span>
              <span className="block text-[0.78rem] text-cream/45">{p.note}</span>
            </span>
            <span className="display shrink-0 text-xl text-coral">{p.height}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Mountaineering() {
  return (
    <section id="mountaineering" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32 lg:py-36">
      {/* faint backdrop */}
      <Image
        src={photos.nightSky}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14] grayscale"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/85 to-ink" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-end gap-8 border-b border-cream/12 pb-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal variant="up">
            <p className="eyebrow mb-5 inline-flex items-center gap-2 text-cream/50">
              <MountainIcon className="h-4 w-4 text-coral" /> Mountaineering
            </p>
            <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
              When the trail runs
              <br />
              out, <span className="text-coral">rope up</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-sm leading-relaxed text-cream/70 lg:pb-2">
              From a first 6,000 m summit to full expedition objectives — guided
              climbs with the permits, crew and acclimatisation dialled in.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal variant="up">
            <PeakList icon={PeakIcon} band="Trekking Peaks" label="6,000 m · first summits" peaks={peaks6000} />
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <PeakList icon={MountainIcon} band="Expedition Peaks" label="7,000 m+ · big objectives" peaks={peaks7000} />
          </Reveal>
        </div>

        <Reveal variant="fade" delay={0.15}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-cream/12 bg-white/[0.03] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="display text-2xl text-cream sm:text-3xl">Planning an expedition?</p>
              <p className="mt-2 max-w-md text-cream/60">
                Tell us your objective and experience — we&apos;ll build the climb,
                the schedule and the support around you.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark"
            >
              Talk to us
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
