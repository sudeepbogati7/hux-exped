import Navbar from "@/components/layout/Navbar";
import HeroVideo from "@/components/hero/HeroVideo";
import Stats from "@/components/sections/Stats";
import AboutCompany from "@/components/sections/AboutCompany";
import OffbeatTreks from "@/components/sections/OffbeatTreks";
import Flagships from "@/components/sections/Flagships";
import Mountaineering from "@/components/sections/Mountaineering";
import BlogSection from "@/components/sections/BlogSection";
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

/** Variation B (primary) — cinematic video hero with in-hero search. */
export default function Home() {
  return (
    <>
      <Navbar overDark />
      <main>
        <HeroVideo />
        <OffbeatTreks />
        <Flagships />
        <Mountaineering />
        <WhyChooseUs />
        <BlogSection />
        <Photography />
        <Stats />
        <AboutCompany />
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
