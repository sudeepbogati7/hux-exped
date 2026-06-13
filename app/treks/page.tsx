import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import TreksExplorer from "@/components/sections/TreksExplorer";
import { MountainIcon } from "@/components/ui/icons";
import { featuredTreks } from "@/lib/data";

export const metadata: Metadata = {
  title: "All treks — HUX EXPED",
  description: "Every HUX EXPED trek — the offbeat, restricted and roadless corners of the Nepal Himalaya.",
};

export default function TreksIndexPage() {
  return (
    <>
      <Navbar subpage />
      <main className="pt-20">
        <section className="bg-cream-deep py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up">
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <MountainIcon className="h-4 w-4 text-coral" /> All treks
              </p>
              <h1 className="display text-5xl text-ink sm:text-7xl lg:text-8xl">
                Every trail we walk
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                {featuredTreks.length} expeditions into the unseen, real Nepal —
                from week-long culture treks to month-long restricted circuits.
              </p>
            </Reveal>

            <Suspense fallback={null}>
              <TreksExplorer />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
