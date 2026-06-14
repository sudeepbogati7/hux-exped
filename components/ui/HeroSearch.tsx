"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/ui/icons";

/** Hero search → routes to the treks listing with a live query. */
export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    router.push(v ? `/treks?q=${encodeURIComponent(v)}` : "/treks");
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full items-center gap-2 rounded-full border border-line bg-cream p-1.5 pl-5 shadow-[0_30px_60px_-30px_rgba(20,20,20,0.5)]"
    >
      <SearchIcon className="h-5 w-5 shrink-0 text-muted" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Expedition, trekking, tours and more…"
        className="min-w-0 flex-1 bg-transparent py-3 text-sm text-ink outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-coral px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-coral-dark sm:px-8"
      >
        Search
      </button>
    </form>
  );
}
