// @/lib/auth-utils.ts
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getIsAdmin() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session")?.value;

  // Si pas de cookie, on s'arrête là
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "ADMIN";
}
