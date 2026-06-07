import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Statement from "@/components/sections/Statement";
import SearchBar from "@/components/sections/SearchBar";
import OffbeatTreks from "@/components/sections/OffbeatTreks";
import Flagships from "@/components/sections/Flagships";
import Mountaineering from "@/components/sections/Mountaineering";
import Photography from "@/components/sections/Photography";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import AboutUs from "@/components/sections/AboutUs";
import GiveBack from "@/components/sections/GiveBack";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <SearchBar />
        <OffbeatTreks />
        <Flagships />
        <Mountaineering />
        <Photography />
        <WhyChooseUs />
        <AboutUs />
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
