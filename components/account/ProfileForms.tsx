"use client";

import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { updateProfile, changePassword, type ProfileState } from "@/app/actions/profile";

const field =
  "w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";
const label = "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";

function Note({ state }: { state: ProfileState }) {
  if (!state) return null;
  if (state.ok) return <p className="mt-3 text-sm font-medium text-[#5a7a1a]">Saved.</p>;
  if (state.error) return <p className="mt-3 text-sm font-medium text-red-600">{state.error}</p>;
  return null;
}

export default function ProfileForms({
  name,
  email,
  image,
  hasPassword,
}: {
  name: string;
  email: string;
  image: string;
  hasPassword: boolean;
}) {
  const { update } = useSession();
  const [pState, profileAction, pPending] = useActionState<ProfileState, FormData>(async (s, fd) => {
    const res = await updateProfile(s, fd);
    if (res?.ok) await update(); // refresh the session so the navbar name updates
    return res;
  }, undefined);
  const [pwState, pwAction, pwPending] = useActionState<ProfileState, FormData>(changePassword, undefined);

  return (
    <div className="space-y-8">
      {/* profile */}
      <section className="rounded-2xl border border-line bg-cream p-6 sm:p-8">
        <h2 className="display text-2xl text-ink">Profile</h2>
        <form action={profileAction} className="mt-5 space-y-4">
          <label className="block">
            <span className={label}>Name</span>
            <input name="name" defaultValue={name} required className={field} />
          </label>
          <label className="block">
            <span className={label}>Email</span>
            <input value={email} disabled className={`${field} cursor-not-allowed opacity-60`} />
          </label>
          <label className="block">
            <span className={label}>Avatar image URL (optional)</span>
            <input name="image" defaultValue={image} className={field} placeholder="https://…" />
          </label>
          <button
            type="submit"
            disabled={pPending}
            className="rounded-full bg-ink px-7 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral hover:text-ink disabled:opacity-60"
          >
            {pPending ? "Saving…" : "Save changes"}
          </button>
          <Note state={pState} />
        </form>
      </section>

      {/* password */}
      <section className="rounded-2xl border border-line bg-cream p-6 sm:p-8">
        <h2 className="display text-2xl text-ink">Password</h2>
        {hasPassword ? (
          <form action={pwAction} className="mt-5 space-y-4">
            <label className="block">
              <span className={label}>Current password</span>
              <input name="current" type="password" required className={field} placeholder="••••••••" />
            </label>
            <label className="block">
              <span className={label}>New password</span>
              <input name="next" type="password" required minLength={8} className={field} placeholder="At least 8 characters" />
            </label>
            <button
              type="submit"
              disabled={pwPending}
              className="rounded-full bg-ink px-7 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-coral hover:text-ink disabled:opacity-60"
            >
              {pwPending ? "Updating…" : "Update password"}
            </button>
            <Note state={pwState} />
          </form>
        ) : (
          <p className="mt-3 text-sm text-ink-soft">
            You signed in with Google, so there&apos;s no password on this account.
          </p>
        )}
      </section>
    </div>
  );
}
