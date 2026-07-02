import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon, CameraIcon, InstagramIcon } from "@/components/ui/icons";
import { galleryPhotos, type GalleryItem, INSTAGRAM_URL } from "@/lib/data";

const edgeFade = {
  WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
  maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
};

function Tile({ item }: { item: GalleryItem }) {
  return (
    <div style={{ flex: "0 0 auto" }} className="w-64 px-2.5 sm:w-80">
      <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-deep">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
        />
      </div>
    </div>
  );
}

export default function Gallery() {
  const mid = Math.ceil(galleryPhotos.length / 2);
  const row1 = galleryPhotos.slice(0, mid);
  const row2 = galleryPhotos.slice(mid);

  return (
    <section id="gallery" className="overflow-hidden bg-cream py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-line pb-12 md:flex-row md:items-end">
          <Reveal variant="up">
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <CameraIcon className="h-4 w-4 text-[#1f6f96]" /> The gallery
            </p>
            <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">From the field</h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral hover:text-ink"
              >
                <CameraIcon className="h-4 w-4" /> View full gallery
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* two opposite-direction ribbons */}
      <div className="mt-14 space-y-4" style={edgeFade}>
        <div className="marquee-track flex w-max" style={{ animationDuration: "70s" }}>
          {row1.concat(row1).map((p, i) => (
            <Tile key={`a${i}`} item={p} />
          ))}
        </div>
        <div className="marquee-track fog-rev flex w-max" style={{ animationDuration: "70s" }}>
          {row2.concat(row2).map((p, i) => (
            <Tile key={`b${i}`} item={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
