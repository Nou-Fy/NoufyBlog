import { prisma } from "@/lib/prisma";

export async function GET() {
  const [usersCount, discussionsCount, regionsCount, expertsCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.discussion.count(),
      prisma.user.groupBy({
        by: ["region"], // si tu as un champ region
      }),
      prisma.user.count({
        where: { role: "ADMIN" }, // exemple pour experts
      }),
    ]);

  return Response.json({
    users: usersCount,
    discussions: discussionsCount,
    regions: regionsCount.length,
    experts: expertsCount,
  });
}
