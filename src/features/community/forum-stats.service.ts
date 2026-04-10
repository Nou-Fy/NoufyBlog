import "server-only";
import { prisma } from "@/lib/prisma";

export async function getForumStats() {
  const [usersCount, discussionsCount, postCount, regionsCount, expertsCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.discussion.count(),
      prisma.post.count(),
      prisma.user.groupBy({ by: ["region"] }),
      prisma.user.count({ where: { role: "ADMIN" } }),
    ]);

  return {
    users: usersCount,
    discussions: discussionsCount,
    tips: postCount,
    location: regionsCount.length,
    regions: regionsCount.length,
    experts: expertsCount,
  };
}

