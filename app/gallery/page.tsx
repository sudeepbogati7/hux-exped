import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryMasonry from "@/components/sections/GalleryMasonry";
import { CameraIcon } from "@/components/ui/icons";
import { galleryPhotos, showreel } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery — HUX EXPED",
  description: "Photographs and film from the field — Nepal, the Khumbu and beyond.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar subpage />
      <main>
        {/* header with background video */}
        <section className="relative isolate flex min-h-[58vh] items-end overflow-hidden bg-ink pt-20 text-cream">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={showreel.poster}
            className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale"
          >
            <source src={showreel.src} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/30" />

          <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8 sm:pb-20">
            <p className="eyebrow mb-5 inline-flex items-center gap-2 text-cream/70">
              <CameraIcon className="h-4 w-4 text-coral" /> The gallery
            </p>
            <h1 className="display text-6xl text-cream sm:text-7xl lg:text-8xl">From the field</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
              {galleryPhotos.length} frames from the high places — base camps,
              summit ridges and the long walks in between.
            </p>
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
