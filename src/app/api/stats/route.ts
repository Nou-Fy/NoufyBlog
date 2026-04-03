"use server";

import { prisma } from "@/lib/prisma"; // Chemin vers ton instance Prisma

export async function getCommunityStats() {
  try {
    // 1. Nombre d'utilisateurs avec le rôle USER (non admin)
    const userCount = await prisma.user.count({
      where: {
        role: "USER",
        archived: false,
      },
    });

    // 2. Nombre total de discussions
    const discussionCount = await prisma.discussion.count({
      where: { archived: false },
    });

    // 3. Nombre total d'articles (Posts)
    const postCount = await prisma.post.count({
      where: { archived: false },
    });

    // 4. Nombre de régions uniques
    // On récupère toutes les régions non nulles et on compte les valeurs distinctes
    const regions = await prisma.user.groupBy({
      by: ["region"],
      where: {
        region: { not: null },
        archived: false,
      },
    });

    return {
      users: userCount,
      discussions: discussionCount,
      tips: postCount,
      location: regions.length,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des stats:", error);
    return null;
  }
}
