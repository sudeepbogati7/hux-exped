"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, X } from "lucide-react";

/**
 * Multi-image uploader for an expedition gallery. Each image URL is emitted as
 * a separate hidden input named `name` (so formData.getAll(name) rebuilds the
 * list on the server). Uploads go to /api/admin/upload.
 */
export default function GalleryUpload({
  name,
  label,
  initialUrls = [],
}: {
  name: string;
  label: string;
  initialUrls?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadMany(files: FileList) {
    setBusy(true);
    setError("");
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        setUrls((prev) => [...prev, data.url]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{label}</span>
      {urls.map((u) => (
        <input key={u} type="hidden" name={name} value={u} />
      ))}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {urls.map((u, i) => (
          <div key={`${u}-${i}`} className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-cream-deep">
            <Image src={u} alt="" fill sizes="120px" className="object-cover" />
            <button
              type="button"
              onClick={() => setUrls((prev) => prev.filter((_, j) => j !== i))}
              className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-ink/80 text-cream opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-line text-muted transition-colors hover:border-coral hover:text-coral disabled:opacity-60"
        >
          {busy ? <Loader2 className="size-5 animate-spin" /> : (
            <span className="flex flex-col items-center gap-1">
              <Upload className="size-5" />
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.1em]">Add</span>
            </span>
          )}
        </button>
      </div>
      {error && <p className="mt-1.5 text-[0.72rem] text-danger">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) uploadMany(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
