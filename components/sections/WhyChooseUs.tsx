import Reveal from "@/components/ui/Reveal";
import { featureIcon } from "@/components/ui/icons";
import { features } from "@/lib/data";

export default function WhyChooseUs() {
  return (
    <section id="why" className="paper py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-end gap-8 border-b border-line pb-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal variant="up">
            <p className="eyebrow mb-5">Why HUX EXPED</p>
            <h2 className="display text-5xl text-ink sm:text-7xl">
              Built for the
              <br />
              ones who go <span className="text-coral">further</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-sm leading-relaxed text-ink-soft lg:pb-2">
              We&apos;re a small Kathmandu outfit run by people who&apos;d rather
              walk the hard route than the popular one. Here&apos;s what that
              means for you.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = featureIcon[f.icon];
            return (
              <Reveal key={f.title} variant="up" delay={(i % 3) * 0.08} className="bg-cream">
                <div className="group h-full p-8 transition-colors hover:bg-cream-deep sm:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream transition-colors group-hover:bg-coral">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>
                  <h3 className="display mt-6 text-2xl text-ink">{f.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
