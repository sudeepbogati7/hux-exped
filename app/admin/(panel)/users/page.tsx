import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UserRoleControl from "@/components/admin/UserRoleControl";

export default async function AdminUsers() {
  const me = await requireAdmin();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { bookings: true } },
    },
  });

  return (
    <div>
      <h1 className="display text-3xl text-ink sm:text-4xl">Users</h1>
      <p className="mt-2 text-ink-soft">{users.length} registered. Promote or demote roles.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-cream">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-line bg-cream-deep text-left text-[0.68rem] uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Bookings</th>
              <th className="px-4 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-semibold text-ink">
                  {u.name ?? "—"}{u.id === me.id && <span className="ml-2 text-[0.66rem] font-normal text-muted">(you)</span>}
                </td>
                <td className="px-4 py-3 text-ink-soft">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] ${u.role === "ADMIN" ? "border-coral/40 bg-coral/15 text-[#5a7a1a]" : "border-line bg-cream-deep text-muted"}`}>
                    {u.role.toLowerCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{u._count.bookings}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <UserRoleControl id={u.id} role={u.role} isSelf={u.id === me.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
