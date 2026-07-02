"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ExpeditionCard from "@/components/ui/ExpeditionCard";
import { SearchIcon, ChevronDown } from "@/components/ui/icons";
import type { Trek } from "@/lib/data";

const MONTH_ABBR: Record<string, string> = {
  March: "mar",
  April: "apr",
  May: "may",
  September: "sep",
  October: "oct",
  November: "nov",
};
const SEASONS = ["Any season", ...Object.keys(MONTH_ABBR)];

export default function TreksExplorer({ treks }: { treks: Trek[] }) {
  const sp = useSearchParams();
  const [query, setQuery] = useState(sp.get("q") ?? "");
  const [season, setSeason] = useState(sp.get("season") ?? "Any season");

  const q = query.trim().toLowerCase();
  const abbr = MONTH_ABBR[season];

  const filtered = treks.filter((t) => {
    const hay = `${t.name} ${t.region} ${t.tagline} ${t.meta}`.toLowerCase();
    const okQ =
      !q || hay.includes(q) || q.split(/\s+/).some((w) => w.length > 2 && hay.includes(w));
    const okS = !abbr || t.season.toLowerCase().includes(abbr);
    return okQ && okS;
  });

  const active = q || abbr;

  return (
    <div>
      {/* filters */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search treks — Kanchenjunga, Dolpo, Tsum…"
            className="w-full rounded-full border border-line bg-cream py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink"
          />
        </div>
        <div className="relative sm:w-56">
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full appearance-none rounded-full border border-line bg-cream py-3.5 pl-5 pr-10 text-sm font-semibold text-ink outline-none transition-colors focus:border-ink"
          >
            {SEASONS.map((sName) => (
              <option key={sName}>{sName}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? "trek" : "treks"}
        {active ? " match your search" : " in the catalogue"}
      </p>

      {filtered.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <ExpeditionCard key={t.slug} item={t} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-line bg-cream p-12 text-center">
          <p className="display text-2xl text-ink">No treks match that.</p>
          <p className="mt-2 text-ink-soft">Try a different destination or clear the season filter.</p>
          <button
            onClick={() => {
              setQuery("");
              setSeason("Any season");
            }}
            className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#1f6f96]"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
