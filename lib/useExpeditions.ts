"use client";

import { useEffect, useState } from "react";

export type ExpeditionLite = {
  slug: string;
  name: string;
  region: string;
  kind: "trek" | "peak";
  image: string;
  days: string;
  altitude: string;
  price: string;
};

/**
 * Client-side fetch of the public expedition list (for search inputs and
 * selects that live inside client-component trees). Cached in a module-level
 * promise so multiple consumers share one request.
 */
let cache: Promise<ExpeditionLite[]> | null = null;
function load(): Promise<ExpeditionLite[]> {
  if (!cache) {
    cache = fetch("/api/expeditions")
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
  }
  return cache;
}

export function useExpeditions(): ExpeditionLite[] {
  const [items, setItems] = useState<ExpeditionLite[]>([]);
  useEffect(() => {
    let alive = true;
    load().then((data) => {
      if (alive) setItems(data);
    });
    return () => {
      alive = false;
    };
  }, []);
  return items;
}
