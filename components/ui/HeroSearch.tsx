"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/ui/icons";
import { allExpeditions } from "@/lib/data";

const SUGGESTIONS = [
  "Manaslu & Tsum Valley",
  "Upper Dolpo Trek",
  "Kanchenjunga Base Camp",
  "Nar Phu Valley",
  "Island Peak",
];

type Hit = { name: string; sub: string; href: string };

/** Hero search — typewriter placeholder + live, in-page result suggestions. */
export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [typed, setTyped] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const index = useMemo<Hit[]>(
    () =>
      allExpeditions.map((e) => ({
        name: e.name,
        sub: `${e.region} · ${e.kind === "peak" ? "Mountaineering" : "Trek"}`,
        href: `/${e.kind === "peak" ? "mountaineering" : "treks"}/${e.slug}`,
      })),
    [],
  );

  const results = useMemo<Hit[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return index
      .filter((h) => h.name.toLowerCase().includes(term) || h.sub.toLowerCase().includes(term))
      .slice(0, 5);
  }, [q, index]);

  // typewriter placeholder — cycles suggestions while the field is empty
  useEffect(() => {
    if (q) return;
    let i = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = SUGGESTIONS[i];
      if (!deleting) {
        char++;
        setTyped(full.slice(0, char));
        if (char === full.length) {
          deleting = true;
          timer = setTimeout(tick, 1500);
          return;
        }
        timer = setTimeout(tick, 70);
      } else {
        char--;
        setTyped(full.slice(0, char));
        if (char === 0) {
          deleting = false;
          i = (i + 1) % SUGGESTIONS.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 35);
      }
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [q]);

  // close dropdown on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (active >= 0 && results[active]) return go(results[active].href);
    const v = q.trim();
    router.push(v ? `/treks?q=${encodeURIComponent(v)}` : "/treks");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open || !results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? results.length - 1 : a - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={boxRef} className="relative w-full">
      <form
        onSubmit={submit}
        className="flex w-full items-center gap-2 rounded-full border border-line bg-cream p-1.5 pl-5 shadow-[0_30px_60px_-30px_rgba(20,20,20,0.5)]"
      >
        <SearchIcon className="h-5 w-5 shrink-0 text-muted" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={typed ? `${typed}…` : "Manaslu & Tsum Valley…"}
          aria-label="Search expeditions"
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-coral px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral-dark sm:px-8"
        >
          Search
        </button>
      </form>

      {/* live results */}
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-30 overflow-hidden rounded-2xl border border-line bg-cream text-left shadow-[0_40px_80px_-30px_rgba(20,20,20,0.55)]">
          <ul className="max-h-80 overflow-y-auto py-1.5">
            {results.map((r, i) => (
              <li key={r.href}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.href)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    active === i ? "bg-cream-deep" : "hover:bg-cream-deep"
                  }`}
                >
                  <SearchIcon className="h-4 w-4 shrink-0 text-muted" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">{r.name}</span>
                    <span className="block truncate text-[0.72rem] text-muted">{r.sub}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <Link
            href={`/treks?q=${encodeURIComponent(q.trim())}`}
            onClick={() => setOpen(false)}
            className="block border-t border-line px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-coral hover:bg-cream-deep"
          >
            See all results for “{q.trim()}” →
          </Link>
        </div>
      )}
    </div>
  );
}
