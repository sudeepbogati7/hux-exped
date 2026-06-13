import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import {
  ArrowIcon,
  ShareIcon,
  StarIcon,
  BadgeCheckIcon,
  CheckIcon,
  UsersIcon,
  ClockIcon,
  GaugeIcon,
  MountainIcon,
  RouteIcon,
  UtensilsIcon,
  TentIcon,
  CalendarIcon,
} from "@/components/ui/icons";
import { huxDifference, type Trek } from "@/lib/data";

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex text-coral">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={className} />
      ))}
    </span>
  );
}

function HeroFact({ icon: Icon, label, value }: { icon: typeof ClockIcon; label: string; value: string }) {
  return (
    <div>
      <Icon className="h-6 w-6 text-coral" />
      <div className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cream/45">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-cream">{value}</div>
    </div>
  );
}

export default function ExpeditionDetail({ data }: { data: Trek }) {
  const isPeak = data.kind === "peak";
  const priceUSD = parseInt(data.price.replace(/[^\d]/g, ""), 10) || 0;
  const reviews = 120 + ((data.slug.length * 37) % 220);
  const pct = 97 + (data.slug.length % 3);
  const backHref = isPeak ? "/#mountaineering" : "/#treks";

  const facts: { icon: typeof ClockIcon; label: string; value: string }[] = [
    { icon: UsersIcon, label: "Group size", value: isPeak ? "Min 2 · Max 8" : "Min 2 · Max 10" },
    { icon: ClockIcon, label: "Duration", value: data.days },
    { icon: GaugeIcon, label: "Grade", value: data.grade },
    { icon: MountainIcon, label: "Max altitude", value: data.altitude },
    { icon: RouteIcon, label: "Activity", value: isPeak ? "Mountaineering" : "Trekking in Nepal" },
    { icon: UtensilsIcon, label: "Meals", value: isPeak ? "Full board on the hill" : "Meals included" },
    { icon: TentIcon, label: "Accommodation", value: isPeak ? "Lodges + camps" : "Teahouse / lodges" },
    { icon: CalendarIcon, label: "Best season", value: data.season },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink pb-16 pt-28 text-cream sm:pb-20 sm:pt-32">
        <Image src={data.hero} alt={data.name} fill priority sizes="100vw" className="object-cover opacity-30 grayscale" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/80 to-ink/60" />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex items-center justify-between">
            <Link href={backHref} className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-coral">
              <ArrowIcon className="h-4 w-4 rotate-180" /> {isPeak ? "All peaks" : "All treks"}
            </Link>
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/55">
              <ShareIcon className="h-4 w-4" /> Share
            </span>
          </div>

          <p className="eyebrow mt-8 text-cream/60">{data.region}</p>
          <h1 className="display mt-3 max-w-4xl text-4xl uppercase leading-[0.92] sm:text-6xl lg:text-7xl">{data.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-cream/85 sm:text-lg">{data.tagline}.</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream/15 pt-6 text-sm">
            <span className="flex items-center gap-2">
              <Stars /> <span className="text-cream/70">Rated 5.0 · {reviews} reviews</span>
            </span>
            <span className="flex items-center gap-2 text-cream/70">
              <BadgeCheckIcon className="h-5 w-5 text-coral" /> Recommended by {pct}% of travellers
            </span>
          </div>

          <div className="mt-9 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {facts.map((f) => (
              <HeroFact key={f.label} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT + booking */}
      <section className="paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* main */}
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Home / {isPeak ? "Mountaineering" : "Treks"} / {data.name}
            </p>
            <p className="mt-5 max-w-2xl text-lg italic leading-relaxed text-ink">{data.blurb}</p>

            {/* trip overview */}
            <div className="mt-12">
              <h2 className="display text-3xl text-ink sm:text-4xl">Trip overview</h2>
              {data.overview.map((p) => (
                <p key={p} className="mt-5 max-w-2xl leading-relaxed text-ink-soft">{p}</p>
              ))}
              <div className="mt-8 rounded-2xl border border-line bg-cream-deep p-7 sm:p-8">
                <h3 className="eyebrow mb-5">Trip highlights</h3>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {data.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-ink">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-coral text-cream">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* gallery */}
            <div className="mt-14">
              <h2 className="display mb-6 text-3xl text-ink sm:text-4xl">On the {isPeak ? "mountain" : "trail"}</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {data.gallery.map((src, i) => (
                  <Reveal key={src} variant="fade" delay={i * 0.05}>
                    <div className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-cream-deep">
                      <Image src={src} alt={`${data.name} ${i + 1}`} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* itinerary */}
            <div className="mt-14">
              <h2 className="display mb-2 text-3xl text-ink sm:text-4xl">Itinerary</h2>
              <p className="mb-6 text-ink-soft">Day by day, the shape of the {isPeak ? "expedition" : "trek"}.</p>
              <div className="border-t border-line">
                {data.itinerary.map((d) => (
                  <div key={d.day} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[110px_1fr_2fr] sm:gap-6">
                    <span className="display text-xl text-coral">{d.day}</span>
                    <span className="display text-lg text-ink">{d.title}</span>
                    <span className="leading-relaxed text-ink-soft">{d.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* included */}
            <div className="mt-14">
              <h2 className="display mb-6 text-3xl text-ink sm:text-4xl">What&apos;s included</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {data.included.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-ink">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-cream">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className="leading-snug">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* booking sidebar */}
          <aside>
            <div className="lg:sticky lg:top-24 lg:-mt-40">
              <div className="relative rounded-2xl border border-line bg-cream shadow-[0_40px_90px_-50px_rgba(20,20,20,0.6)]">
                <span className="absolute -top-3 left-6 rounded-full bg-[#f5c451] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink">
                  All inclusive cost
                </span>
                <div className="p-6 pt-8">
                  <div className="flex items-end justify-between border-b border-line pb-5">
                    <div>
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">From</span>
                      <div className="display text-3xl text-ink">USD {priceUSD.toLocaleString("en-US")}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">Duration</span>
                      <div className="display text-xl text-ink">{data.days}</div>
                    </div>
                  </div>

                  <ul className="my-5 space-y-2.5 text-sm text-ink">
                    {["Book with confidence", "Secure & flexible payments", "Instant booking"].map((t) => (
                      <li key={t} className="flex items-center gap-2.5">
                        <CheckIcon className="h-4 w-4 text-coral" /> {t}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/book/${data.slug}`} className="block rounded-full bg-coral px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral-dark">
                    Book now
                  </Link>
                  <Link href="/#contact" className="mt-3 block rounded-full border border-ink px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-cream">
                    Inquire now
                  </Link>

                  <div className="mt-5 flex items-center justify-center gap-2 text-sm">
                    <Stars className="h-3.5 w-3.5" />
                    <span className="font-semibold text-ink">5.0 Excellent</span>
                    <span className="text-muted">· {reviews} reviews</span>
                  </div>

                  <div className="mt-5 rounded-xl border border-line bg-cream-deep p-5">
                    <p className="display text-lg text-ink">The HUX Difference</p>
                    <ul className="mt-3 space-y-2.5">
                      {huxDifference.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-ink-soft">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28">
        <Image src={data.gallery[0] ?? data.hero} alt="" fill sizes="100vw" className="object-cover opacity-25 grayscale" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/70" />
        <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-8">
          <h2 className="display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            Ready for {data.name}?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/80">
            Lock in your spot now, or ask us anything first — we reply personally.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/book/${data.slug}`} className="group inline-flex items-center gap-3 rounded-full bg-coral px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral-dark">
              Book this {isPeak ? "expedition" : "trek"}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/#contact" className="rounded-full border border-cream/40 px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-ink">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
