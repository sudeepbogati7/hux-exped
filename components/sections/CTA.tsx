import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/icons";
import { photos, site } from "@/lib/data";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-cream sm:py-44">
      <Image
        src={photos.himalayas}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/45" />
      {/* faint peak silhouette (transparent PNG) */}
      <Image
        src="/mountain1.png"
        alt=""
        width={2400}
        height={1350}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full opacity-[0.10]"
      />
      <div className="relative z-10 mx-auto max-w-[1100px] px-5 text-center sm:px-8">
        <Reveal variant="up">
          <p className="eyebrow mb-6 text-cream/60">Active trips with unusual people</p>
          <h2 className="display text-5xl leading-[0.95] sm:text-7xl">
            The map runs out.
            <br />
            That&apos;s where we <span className="text-[#6b8e1f]">begin.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl leading-relaxed text-cream/80">
            Tell us where you want to go — or how far out of your comfort zone
            you&apos;re willing to walk — and we&apos;ll build the expedition
            around you.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#treks"
              className="group inline-flex items-center gap-3 rounded-full bg-coral px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-coral-dark"
            >
              Find your trek
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-cream/40 px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Talk to expert
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
