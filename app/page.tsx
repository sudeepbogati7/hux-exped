import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Statement from "@/components/sections/Statement";
import SearchBar from "@/components/sections/SearchBar";
import FeaturedTreks from "@/components/sections/FeaturedTreks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import AboutUs from "@/components/sections/AboutUs";
import Photography from "@/components/sections/Photography";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <SearchBar />
        <FeaturedTreks />
        <WhyChooseUs />
        <AboutUs />
        <Photography />
        <Gallery />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
