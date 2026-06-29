import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import ExpeditionCard from "@/components/ui/ExpeditionCard";
import { MountainIcon, PeakIcon } from "@/components/ui/icons";
import { peaks7000, peaks6000 } from "@/lib/data";

export const metadata: Metadata = {
  title: "All peaks — HUX EXPED",
  description: "Guided 6,000 m and 7,000 m peaks in Nepal — from first summits to full expeditions.",
};

function Band({
  id,
  icon: Icon,
  title,
  label,
  peaks,
}: {
  id: string;
  icon: typeof PeakIcon;
  title: string;
  label: string;
  peaks: typeof peaks6000;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="mb-6 flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-coral text-ink">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h2 className="display text-2xl text-ink sm:text-3xl">{title}</h2>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {peaks.map((p, i) => (
          <Reveal key={p.slug} variant="up" delay={(i % 3) * 0.07}>
            <ExpeditionCard item={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function MountaineeringIndexPage() {
  return (
    <>
      <Navbar subpage />
      <main className="pt-20">
        <section className="paper py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up">
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <MountainIcon className="h-4 w-4 text-[#6b8e1f]" /> Mountaineering
              </p>
              <h1 className="display text-5xl text-ink sm:text-7xl lg:text-8xl">
                Rope up
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                Guided trekking peaks and full expeditions — permits, crew and
                acclimatisation handled, from a first 6,000 m summit to a serious
                7,000 m objective.
              </p>
            </Reveal>

            <div className="mt-14 space-y-16">
              <Band id="peaks-7000" icon={MountainIcon} title="7000m Peaks" label="Expedition objectives" peaks={peaks7000} />
              <Band id="peaks-6000" icon={PeakIcon} title="6000m Peaks" label="Trekking peaks · first summits" peaks={peaks6000} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
