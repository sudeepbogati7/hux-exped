# HUX EXPED — Static assets guide

This is a **frontend demo**. To keep it working out-of-the-box, photos are
hot-linked from the **Unsplash CDN** (every URL was verified to return `200`),
and the hero background is **procedural Three.js** — no image file needed.

Below is how the assets are wired, and how to collect/swap your own.

---

## 1. How images are wired today

- All photo URLs live in [`lib/data.ts`](lib/data.ts), built by the `uns()` helper:
  ```ts
  uns("1627119703136-3964f14b7325", 1600, 75)
  // → https://images.unsplash.com/photo-1627119703136-3964f14b7325?auto=format&fit=crop&w=1600&q=75
  ```
- Remote hosts are allowlisted in [`next.config.ts`](next.config.ts)
  (`images.unsplash.com`, `plus.unsplash.com`, `images.pexels.com`).
- `next/image` then optimizes, resizes and lazy-loads them automatically.

Current mapping:

| Slot                | Used in                | Photo id (`photo-…`)         |
| ------------------- | ---------------------- | ---------------------------- |
| Kanchenjunga        | Featured trek          | `1627119703136-3964f14b7325` |
| Dolpo / valley      | Featured trek          | `1572109801525-0bb0272e8579` |
| Cloud reveal        | Logo interlude         | `1716741054532-6e047f4018a6` |
| Showcase band       | "Wild places"          | `1624725412168-a8e69d4f7b36` |
| 6,000 m peaks       | Peaks tab              | `1696388882435-4a8a116dff2c` |
| 7,000 m peaks       | Peaks tab              | `1645033393602-4f7623917853` |
| Photographer (Shal) | Photography expedition | `1492146433370-dea32142adc3` |
| Mental-health band  | Our cause              | `1529419244478-88b821449218` |
| Gallery strip ×4    | Photography expedition | see `images.gallery`         |

---

## 2. Where to collect better/real assets (free, commercial-OK)

### Mountain & trek photos
- **Unsplash** — https://unsplash.com/s/photos/kanchenjunga , `/dolpo`,
  `/himalaya-trekking`, `/annapurna`. Free, no attribution required.
- **Pexels** — https://www.pexels.com/search/nepal%20mountains/
- **Pixabay** — https://pixabay.com/images/search/himalaya/

To get a direct, hot-linkable URL from Unsplash: open a photo, copy the id from
the page URL (`unsplash.com/photos/<slug>-<id>`) — actually easiest is to
right-click the image → "Copy image address"; it looks like
`https://images.unsplash.com/photo-XXXX?...`. Drop the `photo-` id into `uns()`.

### Logos / SVGs
- The HUX EXPED peak mark is hand-coded in
  [`components/ui/Logo.tsx`](components/ui/Logo.tsx) — edit the two `<path>`s.
- Icons are in [`components/ui/icons.tsx`](components/ui/icons.tsx).
- For more free SVGs: https://www.svgrepo.com (mountains, camera, compass),
  https://lucide.dev , https://heroicons.com .

### Video (optional hero film / "Watch the film")
- Free stock clips: https://www.pexels.com/videos/search/mountains/ ,
  https://coverr.co , https://mixkit.co/free-stock-video/mountain/ .
- Drop an `.mp4` in `public/` and wire a `<video>` into the "Watch the film"
  button, or use it as a hero background layer.

---

## 3. Going fully local / offline

1. Create `public/images/` and download the photos you want into it, e.g.
   `public/images/kanchenjunga.jpg`.
2. In `lib/data.ts`, replace the `uns(...)` calls with local paths:
   ```ts
   image: "/images/kanchenjunga.jpg",
   ```
3. Local images served from `/public` don't need `remotePatterns` and can use
   `placeholder="blur"` automatically when imported as modules.

> Tip: keep images ~1600 px on the long edge and run them through
> https://squoosh.app (WebP/AVIF, q≈70) before committing — `next/image` will
> still resize, but smaller source files build faster.

---

## 4. Licensing note

Unsplash, Pexels and Pixabay are free for commercial use; attribution is
appreciated but not required. **Do not** swap in Google Images results — most
are copyrighted. For a real launch, confirm each photo's license and credit the
photographer where asked.
