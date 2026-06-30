"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setUserRole } from "@/app/actions/admin";

export default function UserRoleControl({ id, role, isSelf }: { id: string; role: "USER" | "ADMIN"; isSelf: boolean }) {
  const [pending, startTransition] = useTransition();
  const [err, setErr] = useState("");
  const router = useRouter();

  const next = role === "ADMIN" ? "USER" : "ADMIN";

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        disabled={pending || (isSelf && role === "ADMIN")}
        onClick={() => {
          setErr("");
          startTransition(async () => {
            const res = await setUserRole(id, next);
            if (!res.ok) setErr(res.error ?? "Could not update.");
            else router.refresh();
          });
        }}
        className="rounded-full border border-line px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-coral disabled:cursor-not-allowed disabled:opacity-40"
        title={isSelf && role === "ADMIN" ? "You can't demote yourself" : undefined}
      >
        {pending ? "…" : role === "ADMIN" ? "Make user" : "Make admin"}
      </button>
      {err && <span className="text-[0.66rem] text-red-600">{err}</span>}
    </div>
  );
}
