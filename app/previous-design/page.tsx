import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Statement from "@/components/sections/Statement";
import Stats from "@/components/sections/Stats";
import AboutCompany from "@/components/sections/AboutCompany";
import OffbeatTreks from "@/components/sections/OffbeatTreks";
import Flagships from "@/components/sections/Flagships";
import Mountaineering from "@/components/sections/Mountaineering";
import Photography from "@/components/sections/Photography";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import WhoWeAre from "@/components/sections/WhoWeAre";
import GiveBack from "@/components/sections/GiveBack";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "HUX EXPED — Offbeat Himalaya (original design)",
};

/** Variation A — the original light/parallax hero. */
export default function PreviousDesign() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Stats />
        <AboutCompany />
        <OffbeatTreks />
        <Flagships />
        <Mountaineering />
        <Photography />
        <WhyChooseUs />
        <WhoWeAre />
        <GiveBack />
        <Gallery />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
