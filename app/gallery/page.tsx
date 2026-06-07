import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import Showreel from "@/components/ui/Showreel";
import GalleryMasonry from "@/components/sections/GalleryMasonry";
import { CameraIcon } from "@/components/ui/icons";
import { galleryPhotos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery — HUX EXPED",
  description: "Photographs and film from the field — Nepal, the Khumbu and beyond.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar subpage />
      <main className="pt-20">
        {/* header */}
        <section className="paper py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up">
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <CameraIcon className="h-4 w-4 text-coral" /> The gallery
              </p>
              <h1 className="display text-6xl text-ink sm:text-7xl lg:text-8xl">
                From the field
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                {galleryPhotos.length} frames and a short film from the high
                places — base camps, summit ridges and the long walks in
                between.
              </p>
            </Reveal>
          </div>
        </section>

        {/* film */}
        <section className="bg-cream-deep py-12 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="fade">
              <Showreel />
            </Reveal>
          </div>
        </section>

        {/* all photos */}
        <section className="paper py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <GalleryMasonry />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
