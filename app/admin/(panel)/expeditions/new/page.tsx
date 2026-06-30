import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createExpedition } from "@/app/actions/admin";
import ExpeditionForm from "@/components/admin/ExpeditionForm";

export default async function NewExpeditionPage() {
  await requireAdmin();
  return (
    <div className="max-w-3xl">
      <Link href="/admin/expeditions" className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink">← All expeditions</Link>
      <h1 className="display mt-3 text-3xl text-ink sm:text-4xl">New expedition</h1>
      <p className="mt-2 text-ink-soft">Create a trek or mountaineering peak.</p>
      <div className="mt-8">
        <ExpeditionForm action={createExpedition} submitLabel="Create expedition" />
      </div>
    </div>
  );
}
