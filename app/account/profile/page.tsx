import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProfileForms from "@/components/account/ProfileForms";

export const metadata = { title: "Profile — HUX EXPED" };

export default async function ProfilePage() {
  const sessionUser = await requireUser("/account/profile");
  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: { name: true, email: true, image: true, passwordHash: true },
  });

  return (
    <ProfileForms
      name={user?.name ?? ""}
      email={user?.email ?? ""}
      image={user?.image ?? ""}
      hasPassword={!!user?.passwordHash}
    />
  );
}
