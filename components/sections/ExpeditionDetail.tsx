"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  MapPinIcon,
  CompassIcon,
  HeartIcon,
  ShieldIcon,
  RouteIcon,
  TentIcon,
  FlagIcon,
} from "@/components/ui/icons";
import ExpeditionCard from "@/components/ui/ExpeditionCard";
import { huxDifference, notIncluded, gearList, reviews, departures, type Trek } from "@/lib/data";

const TABS = ["Overview", "Itinerary", "Available Dates", "Includes", "Gear List", "Gallery", "Reviews"] as const;
type Tab = (typeof TABS)[number];

const gearIcon: Record<string, (p: { className?: string }) => React.ReactElement> = {
  shield: ShieldIcon,
  route: RouteIcon,
  tent: TentIcon,
  flag: FlagIcon,
  heart: HeartIcon,
  gauge: GaugeIcon,
};

const tierStyle: Record<string, string> = {
  "Must Have": "border-coral/30 bg-coral/10 text-[#1f6f96]",
  Recommended: "border-[#cf9b1d]/40 bg-[#f5c451]/15 text-[#a9781a]",
  Optional: "border-line bg-cream-deep text-muted",
};

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex text-[#1f6f96]">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={className} />
      ))}
    </span>
  );
}

function Cross({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export default function ExpeditionDetail({
  data,
  similar: similarInput = [],
  notIncluded: notIncludedInput,
  availableDates,
}: {
  data: Trek;
  similar?: Trek[];
  notIncluded?: string[];
  availableDates?: string[];
}) {
  const isPeak = data.kind === "peak";
  const priceUSD = parseInt(data.price.replace(/[^\d]/g, ""), 10) || 0;
  const reviewCount = 120 + ((data.slug.length * 37) % 220);
  const backHref = isPeak ? "/#mountaineering" : "/#treks";
  // Prefer admin-managed dates; fall back to the deterministic sample set.
  const dates = useMemo(() => {
    if (availableDates && availableDates.length) {
      return availableDates.map((date, i) => {
        const spots = 2 + ((data.slug.length * (i + 3)) % 8);
        const status: "Almost full" | "Available" = spots <= 3 ? "Almost full" : "Available";
        return { date, spots, status };
      });
    }
    return departures(data.slug);
  }, [availableDates, data.slug]);
  const excludes = notIncludedInput && notIncludedInput.length ? notIncludedInput : notIncluded;
  const similar = useMemo(() => {
    const pool = similarInput.filter((e) => e.slug !== data.slug);
    const sameKind = pool.filter((e) => e.kind === data.kind);
    return [...sameKind, ...pool.filter((e) => e.kind !== data.kind)].slice(0, 3);
  }, [similarInput, data.slug, data.kind]);

  const [tab, setTab] = useState<Tab>("Overview");
  const [persons, setPersons] = useState(1);
  const [wished, setWished] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"All" | "Must Have" | "Recommended" | "Optional">("All");

  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const allKeys = useMemo(
    () => gearList.flatMap((c) => c.items.map((it) => `${c.key}:${it.name}`)),
    [],
  );
  const totalItems = allKeys.length;
  const packedCount = checked.size;
  const packedPct = Math.round((packedCount / totalItems) * 100);

  const glance: { icon: (p: { className?: string }) => React.ReactElement; value: string; label: string }[] = [
    { icon: ClockIcon, value: data.days, label: "Duration" },
    { icon: MountainIcon, value: data.altitude, label: "Max altitude" },
    { icon: GaugeIcon, value: data.grade, label: "Difficulty" },
    { icon: UsersIcon, value: isPeak ? "2–8" : "2–14", label: "Group size" },
    { icon: MapPinIcon, value: data.region, label: "Region" },
    { icon: CompassIcon, value: data.season, label: "Best season" },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink pb-14 pt-28 text-cream sm:pt-32">
        <Image src={data.hero || data.image} alt={data.name} fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/75 to-ink/45" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex items-center justify-between">
            <Link href={backHref} className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-[#1f6f96]">
              <ArrowIcon className="h-4 w-4 rotate-180" /> {isPeak ? "All peaks" : "All treks"}
            </Link>
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/55">
              <ShareIcon className="h-4 w-4" /> Share
            </span>
          </div>
          <p className="eyebrow mt-8 text-cream/60">{data.region}</p>
          <h1 className="display mt-3 max-w-4xl text-4xl uppercase leading-[0.92] sm:text-6xl lg:text-7xl">{data.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-cream/85 sm:text-lg">{data.tagline}.</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-2"><Stars /> <span className="text-cream/70">4.8 · {reviewCount} reviews</span></span>
            <span className="flex items-center gap-2 text-cream/70"><BadgeCheckIcon className="h-5 w-5 text-[#1f6f96]" /> {data.days} · {data.grade}</span>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="sticky top-20 z-30 border-b border-line bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-3 sm:px-8">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 border-b-2 px-4 py-4 text-sm font-semibold transition-colors ${
                tab === t ? "border-coral text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT + booking */}
      <section className="paper py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1400px] items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* main */}
          <div className="min-w-0">
            {/* OVERVIEW */}
            {tab === "Overview" && (
              <div className="space-y-14">
                <div>
                  <h2 className="display text-3xl text-ink sm:text-4xl">About this {isPeak ? "climb" : "trek"}</h2>
                  <span className="mt-3 block h-0.5 w-16 bg-coral" />
                  <p className="mt-6 max-w-2xl text-lg italic leading-relaxed text-ink">{data.blurb}</p>
                  {data.overview.map((p) => (
                    <p key={p} className="mt-5 max-w-2xl leading-relaxed text-ink-soft">{p}</p>
                  ))}
                </div>

                <div>
                  <h2 className="display text-3xl text-ink sm:text-4xl">{isPeak ? "Climb" : "Trek"} highlights</h2>
                  <span className="mt-3 block h-0.5 w-16 bg-coral" />
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {data.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-3 rounded-2xl border border-line bg-cream-deep p-4">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral text-ink">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                        <span className="leading-snug text-ink">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="display text-3xl text-ink sm:text-4xl">{isPeak ? "Climb" : "Trek"} at a glance</h2>
                  <span className="mt-3 block h-0.5 w-16 bg-coral" />
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {glance.map((g) => (
                      <div key={g.label} className="rounded-2xl border border-line bg-cream-deep p-5 text-center">
                        <g.icon className="mx-auto h-6 w-6 text-[#1f6f96]" />
                        <div className="display mt-3 text-xl text-ink">{g.value}</div>
                        <div className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">{g.label}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setTab("Itinerary")}
                    className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral hover:text-ink"
                  >
                    View the full day-by-day itinerary
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ITINERARY */}
            {tab === "Itinerary" && (
              <div>
                <h2 className="display text-3xl text-ink sm:text-4xl">Itinerary</h2>
                <p className="mt-3 text-ink-soft">Day by day, the shape of the {isPeak ? "expedition" : "trek"}.</p>

                {/* route map */}
                <figure className="mt-6 overflow-hidden rounded-2xl border border-line bg-cream-deep">
                  <div className="relative aspect-[16/9] w-full">
                    <Image src="/map.jpg" alt={`${data.name} route map`} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                  </div>
                  <figcaption className="flex items-center gap-2 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    <MapPinIcon className="h-4 w-4 text-[#1f6f96]" /> Route map · {data.region}
                  </figcaption>
                </figure>

                <div className="mt-8 border-t border-line">
                  {data.itinerary.map((d) => (
                    <div key={d.day} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[110px_1fr_2fr] sm:gap-6">
                      <span className="display text-xl text-[#1f6f96]">{d.day}</span>
                      <span className="display text-lg text-ink">{d.title}</span>
                      <span className="leading-relaxed text-ink-soft">{d.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AVAILABLE DATES */}
            {tab === "Available Dates" && (
              <div>
                <h2 className="display text-3xl text-ink sm:text-4xl">Available departures</h2>
                <p className="mt-3 text-ink-soft">Fixed group departures. Private dates on request.</p>
                <div className="mt-8 space-y-3">
                  {dates.map((d) => (
                    <div key={d.date} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-cream-deep p-5">
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink text-cream"><ClockIcon className="h-5 w-5" /></span>
                        <div>
                          <div className="display text-lg text-ink">{d.date}</div>
                          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">{data.days}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <span className={`rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] ${d.status === "Almost full" ? "bg-coral/10 text-[#1f6f96]" : "bg-ink/5 text-ink-soft"}`}>
                          {d.status === "Almost full" ? `${d.spots} spots left` : `${d.spots} spots`}
                        </span>
                        <Link href={`/book/${data.slug}`} className="rounded-full bg-coral px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-coral-dark">
                          Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INCLUDES */}
            {tab === "Includes" && (
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <h2 className="display flex items-center gap-3 text-2xl text-ink sm:text-3xl">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-green-600 text-white"><CheckIcon className="h-4 w-4" /></span>
                    What&apos;s included
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {data.included.map((it) => (
                      <li key={it} className="flex items-start gap-3 rounded-xl border border-green-700/20 bg-green-700/5 p-4 text-ink">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="display flex items-center gap-3 text-2xl text-ink sm:text-3xl">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-white"><Cross className="h-4 w-4" /></span>
                    Not included
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {excludes.map((it) => (
                      <li key={it} className="flex items-start gap-3 rounded-xl border border-danger/25 bg-danger/5 p-4 text-ink">
                        <Cross className="mt-1 h-3.5 w-3.5 shrink-0 text-danger" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* GEAR LIST */}
            {tab === "Gear List" && (
              <div>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="display text-3xl text-ink sm:text-4xl">Packing checklist</h2>
                    <p className="mt-2 text-ink-soft">{packedCount} of {totalItems} items packed · {packedPct}%</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setChecked(new Set(allKeys))} className="rounded-full border border-line px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-cream-deep">Check all</button>
                    <button onClick={() => setChecked(new Set())} className="rounded-full border border-line px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-cream-deep">Reset</button>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-coral transition-all duration-300" style={{ width: `${packedPct}%` }} />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {(["All", "Must Have", "Recommended", "Optional"] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-4 py-1.5 text-[0.72rem] font-semibold transition-colors ${filter === f ? "border-coral bg-coral text-ink" : "border-line text-ink-soft hover:border-coral"}`}>{f}</button>
                  ))}
                </div>

                <div className="mt-8 space-y-6">
                  {gearList.map((cat) => {
                    const Icon = gearIcon[cat.icon] ?? ShieldIcon;
                    const items = cat.items.filter((it) => filter === "All" || it.tier === filter);
                    if (!items.length) return null;
                    const done = cat.items.filter((it) => checked.has(`${cat.key}:${it.name}`)).length;
                    return (
                      <div key={cat.key} className="overflow-hidden rounded-2xl border border-line">
                        <div className="flex items-center gap-3 border-b border-line bg-cream-deep px-5 py-4">
                          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-cream"><Icon className="h-4 w-4" /></span>
                          <span className="display text-lg text-ink">{cat.title}</span>
                          <span className="ml-auto rounded-full bg-ink/5 px-3 py-1 text-[0.7rem] font-semibold text-muted">{done}/{cat.items.length}</span>
                        </div>
                        <ul>
                          {items.map((it) => {
                            const key = `${cat.key}:${it.name}`;
                            const on = checked.has(key);
                            return (
                              <li key={key}>
                                <button onClick={() => toggle(key)} className="flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-cream-deep">
                                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors ${on ? "border-coral bg-coral text-ink" : "border-line"}`}>
                                    {on && <CheckIcon className="h-3 w-3" />}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className={`block font-semibold ${on ? "text-muted line-through" : "text-ink"}`}>{it.name}</span>
                                    <span className="block text-[0.8rem] text-muted">{it.note}</span>
                                  </span>
                                  <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] ${tierStyle[it.tier]}`}>{it.tier}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GALLERY */}
            {tab === "Gallery" && (
              <div>
                <h2 className="display text-3xl text-ink sm:text-4xl">On the {isPeak ? "mountain" : "trail"}</h2>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[data.hero, ...data.gallery].map((src, i) => (
                    <div key={`${src}-${i}`} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-cream-deep">
                      <Image src={src} alt={`${data.name} ${i + 1}`} fill sizes="(max-width:640px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS */}
            {tab === "Reviews" && (
              <div>
                <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-line bg-cream-deep p-6">
                  <div className="text-center">
                    <div className="display text-5xl text-ink">4.8</div>
                    <Stars className="mt-1 h-4 w-4" />
                    <div className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-muted">{reviewCount} reviews</div>
                  </div>
                  <p className="max-w-md leading-relaxed text-ink-soft">
                    Travellers consistently rate the pacing, the guides and the
                    sheer remoteness of this {isPeak ? "climb" : "trek"}.
                  </p>
                </div>
                <div className="mt-6 space-y-4">
                  {reviews.map((r) => (
                    <div key={r.name} className="rounded-2xl border border-line bg-cream p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-coral text-sm font-semibold text-ink">{r.name.split(" ").map((p) => p[0]).join("")}</span>
                          <div>
                            <div className="text-sm font-semibold text-ink">{r.name}</div>
                            <div className="text-[0.72rem] text-muted">{r.country} · {r.date}</div>
                          </div>
                        </div>
                        <span className="flex text-[#1f6f96]">{Array.from({ length: r.rating }).map((_, i) => <StarIcon key={i} className="h-3.5 w-3.5" />)}</span>
                      </div>
                      <p className="mt-4 leading-relaxed text-ink-soft">&ldquo;{r.text}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* booking card */}
          <aside>
            <div className="lg:sticky lg:top-40">
              <div className="overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_40px_90px_-50px_rgba(20,20,20,0.6)]">
                <div className="p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">From</span>
                      <div className="display text-4xl text-ink">${priceUSD.toLocaleString("en-US")}<span className="text-base font-normal text-muted"> / person</span></div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#1f6f96]"><ClockIcon className="h-3.5 w-3.5" /> {data.days}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Stars className="h-3.5 w-3.5" /> <span className="font-semibold text-ink">4.8</span> <span className="text-muted">({reviewCount} reviews)</span>
                  </div>

                  <div className="mt-5 border-t border-line pt-5">
                    <p className="mb-2 inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-muted"><UsersIcon className="h-4 w-4" /> Group size</p>
                    <div className="flex items-center justify-between rounded-xl border border-line bg-cream-deep p-1.5">
                      <button onClick={() => setPersons((p) => Math.max(1, p - 1))} className="grid h-10 w-10 place-items-center rounded-lg text-xl text-ink hover:bg-cream">−</button>
                      <span className="text-sm font-semibold text-ink">{persons} {persons === 1 ? "person" : "people"}</span>
                      <button onClick={() => setPersons((p) => Math.min(14, p + 1))} className="grid h-10 w-10 place-items-center rounded-lg text-xl text-ink hover:bg-cream">+</button>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-line pt-5 text-sm text-ink-soft">
                    <span>${priceUSD.toLocaleString("en-US")} × {persons} {persons === 1 ? "person" : "people"}</span>
                    <span>${(priceUSD * persons).toLocaleString("en-US")}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                    <span className="display text-lg text-ink">Total</span>
                    <span className="display text-lg text-ink">${(priceUSD * persons).toLocaleString("en-US")}</span>
                  </div>

                  <Link href={`/book/${data.slug}`} className="mt-5 block rounded-full bg-coral px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-coral-dark">
                    Book now
                  </Link>
                  <button onClick={() => setWished((w) => !w)} className="mt-3 flex w-full items-center justify-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-[#1f6f96]">
                    <HeartIcon className={`h-4 w-4 ${wished ? "text-[#1f6f96]" : ""}`} /> {wished ? "Saved to wishlist" : "Add to wishlist"}
                  </button>

                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[0.85rem] text-ink-soft">
                    {["Free cancellation up to 30 days", "24/7 support during trek", "Expert local guides"].map((t) => (
                      <li key={t} className="flex items-center gap-2.5"><CheckIcon className="h-4 w-4 shrink-0 text-[#1f6f96]" /> {t}</li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-xl border border-line bg-cream-deep p-5">
                    <p className="display text-base text-ink">The HUX Difference</p>
                    <ul className="mt-3 space-y-2">
                      {huxDifference.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-[0.82rem] leading-snug text-ink-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" /> {d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* similar packages */}
      {similar.length > 0 && (
        <section className="bg-cream-deep py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-3 text-muted">You might also like</p>
                <h2 className="display text-3xl text-ink sm:text-4xl">Similar packages</h2>
              </div>
              <Link
                href={isPeak ? "/mountaineering" : "/treks"}
                className="hidden shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-[#1f6f96] sm:inline"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((e) => (
                <ExpeditionCard key={e.slug} item={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
