"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, X } from "lucide-react";

/**
 * Single-image uploader. Shows the current image, lets the user pick a file
 * (uploaded to /api/admin/upload — admin only), and writes the resulting URL
 * into a hidden input named `name`. Pass `onChange` to react to the URL.
 */
export default function ImageUpload({
  name,
  label,
  initialUrl = "",
  onChange,
  endpoint = "/api/admin/upload",
}: {
  name: string;
  label: string;
  initialUrl?: string;
  onChange?: (url: string) => void;
  endpoint?: string;
}) {
  const [url, setUrlState] = useState(initialUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const setUrl = (v: string) => {
    setUrlState(v);
    onChange?.(v);
  };

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(endpoint, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{label}</span>
      <input type="hidden" name={name} value={url} />

      <div className="flex items-center gap-4">
        {/* preview */}
        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-line bg-cream-deep">
          {url ? (
            <Image src={url} alt="" fill sizes="96px" className="object-cover" />
          ) : (
            <span className="grid h-full place-items-center text-[0.66rem] text-muted">No image</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-coral disabled:opacity-60"
            >
              {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
              {busy ? "Uploading…" : url ? "Replace image" : "Upload image"}
            </button>
            {url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-danger"
              >
                <X className="size-3.5" /> Remove
              </button>
            )}
          </div>
          <p className="mt-1.5 truncate text-[0.72rem] text-muted">{url || "JPG, PNG, WEBP · max 8 MB"}</p>
          {error && <p className="mt-1 text-[0.72rem] text-danger">{error}</p>}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
