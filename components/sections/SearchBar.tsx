"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import { SearchIcon, ChevronDown } from "@/components/ui/icons";

const DESTINATIONS = ["Kanchenjunga", "Dolpo", "Makalu", "Nar & Phu", "Mustang", "Manaslu & Tsum", "Dhaulagiri", "Pikey Peak"];
const MONTHS = ["March", "April", "May", "September", "October", "November"];

/** Airbnb-style expedition search → routes to /treks with live filters. */
export default function SearchBar() {
  const router = useRouter();
  const [dest, setDest] = useState("Where to?");
  const [month, setMonth] = useState("Any month");
  const [open, setOpen] = useState<null | "dest" | "month">(null);

  const search = () => {
    const params = new URLSearchParams();
    if (dest !== "Where to?") params.set("q", dest);
    if (month !== "Any month") params.set("season", month);
    const qs = params.toString();
    router.push(qs ? `/treks?${qs}` : "/treks");
  };

  return (
    <section className="paper relative z-30 flex min-h-[40vh] items-center py-16">
      <div className="mx-auto w-full max-w-[920px] px-5 sm:px-8">
        <Reveal variant="fade" className="mb-6 text-center">
          <p className="eyebrow inline-flex items-center gap-2">
            <SearchIcon className="h-3.5 w-3.5" /> Find your expedition
          </p>
        </Reveal>
        <Reveal variant="up">
          <div className="mx-auto flex w-full flex-col items-stretch gap-2 rounded-3xl border border-line bg-cream p-2 shadow-[0_30px_70px_-40px_rgba(20,20,20,0.45)] md:w-fit md:flex-row md:items-center md:rounded-full">
            {/* destination */}
            <div className="relative md:w-[210px]">
              <button
                onClick={() => setOpen(open === "dest" ? null : "dest")}
                className="flex w-full flex-col items-start rounded-2xl px-6 py-3 text-left transition-colors hover:bg-cream-deep md:rounded-full"
              >
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">Destination</span>
                <span className={`mt-0.5 flex items-center gap-2 text-sm font-semibold ${dest === "Where to?" ? "text-muted" : "text-ink"}`}>
                  {dest} <ChevronDown className="h-3.5 w-3.5" />
                </span>
              </button>
              {open === "dest" && (
                <div className="absolute left-2 right-2 top-full z-40 mt-2 max-h-72 overflow-auto rounded-2xl border border-line bg-cream py-2 shadow-xl">
                  {DESTINATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDest(d); setOpen(null); }}
                      className="block w-full px-6 py-2.5 text-left text-sm text-ink hover:bg-cream-deep"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="hidden h-8 w-px bg-line md:block" />

            {/* month */}
            <div className="relative md:w-[190px]">
              <button
                onClick={() => setOpen(open === "month" ? null : "month")}
                className="flex w-full flex-col items-start rounded-2xl px-6 py-3 text-left transition-colors hover:bg-cream-deep md:rounded-full"
              >
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">Departure</span>
                <span className={`mt-0.5 flex items-center gap-2 text-sm font-semibold ${month === "Any month" ? "text-muted" : "text-ink"}`}>
                  {month} <ChevronDown className="h-3.5 w-3.5" />
                </span>
              </button>
              {open === "month" && (
                <div className="absolute left-2 right-2 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-line bg-cream py-2 shadow-xl">
                  {MONTHS.map((m) => (
                    <button
                      key={m}
                      onClick={() => { setMonth(m); setOpen(null); }}
                      className="block w-full px-6 py-2.5 text-left text-sm text-ink hover:bg-cream-deep"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="hidden h-8 w-px bg-line md:block" />

            {/* search */}
            <button
              onClick={search}
              className="flex items-center justify-center gap-2 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral-dark"
            >
              <SearchIcon className="h-4 w-4" />
              Search
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
