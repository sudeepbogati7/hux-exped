"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import GalleryUpload from "@/components/admin/GalleryUpload";
import type { AdminState } from "@/app/actions/admin";

export type ExpeditionFormValues = {
  slug: string;
  name: string;
  kind: "TREK" | "PEAK";
  band: string;
  region: string;
  meta: string;
  days: string;
  altitude: string;
  grade: string;
  priceUSD: number;
  season: string;
  tagline: string;
  blurb: string;
  overview: string[];
  image: string;
  hero: string;
  gallery: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  availableDates: string[];
  flagship: boolean;
  published: boolean;
  itinerary: { day: string; title: string; detail: string }[];
};

const field =
  "w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";
const label = "mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted";

export default function ExpeditionForm({
  action,
  initial,
  submitLabel,
}: {
  action: (state: AdminState, formData: FormData) => Promise<AdminState>;
  initial?: Partial<ExpeditionFormValues>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<AdminState, FormData>(action, undefined);
  const [kind, setKind] = useState<"TREK" | "PEAK">(initial?.kind ?? "TREK");
  const [itin, setItin] = useState(initial?.itinerary?.length ? initial.itinerary : [{ day: "", title: "", detail: "" }]);
  const [dates, setDates] = useState<string[]>(initial?.availableDates?.length ? initial.availableDates : [""]);

  const join = (a?: string[]) => (a ?? []).join("\n");

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{state.error}</div>
      )}

      {/* core */}
      <section className="rounded-2xl border border-line bg-cream p-6">
        <h2 className="display text-xl text-ink">Basics</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label><span className={label}>Name</span><input name="name" defaultValue={initial?.name} required className={field} /></label>
          <label><span className={label}>Slug (URL)</span><input name="slug" defaultValue={initial?.slug} required className={field} placeholder="kanchenjunga" /></label>
          <label>
            <span className={label}>Type</span>
            <select name="kind" value={kind} onChange={(e) => setKind(e.target.value as "TREK" | "PEAK")} className={field}>
              <option value="TREK">Trek</option>
              <option value="PEAK">Peak (mountaineering)</option>
            </select>
          </label>
          {kind === "PEAK" && (
            <label>
              <span className={label}>Band</span>
              <select name="band" defaultValue={initial?.band ?? "6000m"} className={field}>
                <option value="6000m">6000m</option>
                <option value="7000m">7000m</option>
              </select>
            </label>
          )}
          <label><span className={label}>Region</span><input name="region" defaultValue={initial?.region} className={field} placeholder="Eastern Nepal · Taplejung" /></label>
          <label><span className={label}>Meta (sub-label)</span><input name="meta" defaultValue={initial?.meta} className={field} placeholder="Base Camp Circuit" /></label>
          <label><span className={label}>Days</span><input name="days" defaultValue={initial?.days} className={field} placeholder="24 days" /></label>
          <label><span className={label}>Max altitude</span><input name="altitude" defaultValue={initial?.altitude} className={field} placeholder="5,143 m" /></label>
          <label><span className={label}>Grade</span><input name="grade" defaultValue={initial?.grade} className={field} placeholder="Strenuous" /></label>
          <label><span className={label}>Price (USD)</span><input name="priceUSD" type="number" defaultValue={initial?.priceUSD} className={field} placeholder="3450" /></label>
          <label><span className={label}>Season</span><input name="season" defaultValue={initial?.season} className={field} placeholder="Mar–May · Sep–Nov" /></label>
          <label><span className={label}>Tagline</span><input name="tagline" defaultValue={initial?.tagline} className={field} placeholder="The wild eastern frontier" /></label>
        </div>
        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-ink">
            <input type="checkbox" name="flagship" defaultChecked={initial?.flagship} className="h-4 w-4 accent-coral" /> Flagship (home spotlight)
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink">
            <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} className="h-4 w-4 accent-coral" /> Published
          </label>
        </div>
      </section>

      {/* copy */}
      <section className="rounded-2xl border border-line bg-cream p-6">
        <h2 className="display text-xl text-ink">Description</h2>
        <div className="mt-4 space-y-4">
          <label className="block"><span className={label}>Blurb (short)</span><textarea name="blurb" defaultValue={initial?.blurb} rows={3} className={`${field} resize-none`} /></label>
          <label className="block"><span className={label}>Overview (one paragraph per line)</span><textarea name="overview" defaultValue={join(initial?.overview)} rows={4} className={`${field} resize-none`} /></label>
          <label className="block"><span className={label}>Highlights (one per line)</span><textarea name="highlights" defaultValue={join(initial?.highlights)} rows={4} className={`${field} resize-none`} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className={label}>What&apos;s included (one per line)</span><textarea name="included" defaultValue={join(initial?.included)} rows={5} className={`${field} resize-none`} /></label>
            <label className="block"><span className={label}>What&apos;s not included (one per line)</span><textarea name="notIncluded" defaultValue={join(initial?.notIncluded)} rows={5} className={`${field} resize-none`} /></label>
          </div>
        </div>
      </section>

      {/* media — real uploads */}
      <section className="rounded-2xl border border-line bg-cream p-6">
        <h2 className="display text-xl text-ink">Media</h2>
        <p className="mt-1 text-sm text-ink-soft">Upload images directly — no file paths needed.</p>
        <div className="mt-5 space-y-6">
          <ImageUpload name="image" label="Card / hero image" initialUrl={initial?.image} />
          {/* hero mirrors the card image */}
          <GalleryUpload name="gallery" label="Gallery images" initialUrls={initial?.gallery} />
        </div>
      </section>

      {/* available dates */}
      <section className="rounded-2xl border border-line bg-cream p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="display text-xl text-ink">Available departures</h2>
            <p className="mt-1 text-sm text-ink-soft">Dates travellers can choose when booking.</p>
          </div>
          <button type="button" onClick={() => setDates((d) => [...d, ""])} className="rounded-full border border-line px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-coral">
            + Add date
          </button>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {dates.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                name="availableDates"
                value={d}
                onChange={(e) => setDates((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
                className={field}
                placeholder="e.g. 15 Mar 2026"
              />
              <button type="button" onClick={() => setDates((prev) => prev.filter((_, j) => j !== i))} className="shrink-0 rounded-lg px-2.5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-danger">
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* itinerary */}
      <section className="rounded-2xl border border-line bg-cream p-6">
        <div className="flex items-center justify-between">
          <h2 className="display text-xl text-ink">Itinerary</h2>
          <button type="button" onClick={() => setItin((r) => [...r, { day: "", title: "", detail: "" }])} className="rounded-full border border-line px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-coral">
            + Add day
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {itin.map((row, i) => (
            <div key={i} className="grid gap-3 rounded-xl border border-line p-3 sm:grid-cols-[90px_1fr_auto]">
              <input name="itin_day" defaultValue={row.day} className={field} placeholder="01" />
              <div className="space-y-2">
                <input name="itin_title" defaultValue={row.title} className={field} placeholder="Day title" />
                <input name="itin_detail" defaultValue={row.detail} className={field} placeholder="What happens this day" />
              </div>
              <button type="button" onClick={() => setItin((r) => r.filter((_, j) => j !== i))} className="self-start rounded-lg px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-red-600">
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className="rounded-full bg-ink px-8 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral hover:text-ink disabled:opacity-60">
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link href="/admin/expeditions" className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink">Cancel</Link>
      </div>
    </form>
  );
}
