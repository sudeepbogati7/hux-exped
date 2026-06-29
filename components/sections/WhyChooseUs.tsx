import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { features } from "@/lib/data";

export default function WhyChooseUs({ id = "why" }: { id?: string } = {}) {
  return (
    <section id={id} className="paper relative overflow-hidden pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal variant="up" className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Why HUX EXPED</p>
          <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">
            Built for the ones who go <span className="text-[#6b8e1f]">further</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink-soft">
            We&apos;re a small outfit run by people who&apos;d rather walk the
            hard route than the popular one. Here&apos;s what that means for you.
          </p>
        </Reveal>

        {/* open feature grid — no boxes */}
        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            return (
              <Reveal key={f.title} variant="up" delay={(i % 3) * 0.08}>
                <div className="text-center sm:text-left">
                  <Image
                    src={f.img}
                    alt=""
                    width={320}
                    height={320}
                    aria-hidden
                    className="mx-auto h-20 w-20 object-contain sm:mx-0 sm:h-24 sm:w-24"
                  />
                  <h3 className="display mt-5 text-2xl text-ink">{f.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink-soft sm:mx-0">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* purpose + layered mountain silhouette */}
      <div className="relative mt-20 sm:mt-28">
        <Reveal variant="up" className="relative z-10 mx-auto max-w-2xl px-5 pb-24 text-center sm:px-8 sm:pb-32">
          <p className="eyebrow text-muted">Our purpose</p>
          <p className="display mx-auto mt-4 max-w-xl text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            To protect Nepal&apos;s wild places, one trek at a time.
          </p>
        </Reveal>
        {/* real mountain range silhouette (transparent PNG) */}
        <Image
          src="/mountain3.png"
          alt=""
          width={2400}
          height={1600}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full opacity-[0.12] grayscale"
        />
      </div>
    </section>
  );
}
