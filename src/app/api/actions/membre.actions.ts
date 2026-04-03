// src/lib/actions/member.actions.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function getTopMembers() {
  try {
    const topMembers = await prisma.user.findMany({
      take: 3,
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      select: {
        id: true,
        nom: true,
        _count: {
          select: { posts: true },
        },
      },
    });

    return { success: true, data: topMembers };
  } catch (error) {
    console.error("Erreur TopMembers:", error);
    return { success: false, data: [] };
  }
}

export async function getLatestMonthlyMembers() {
  try {
    const now = new Date();
    // Définit le premier jour du mois actuel à 00:00:00
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const members = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
      take: 10,
      orderBy: {
        createdAt: "desc", // Les plus récents en premier
      },
      select: {
        id: true,
        nom: true,
        createdAt: true,
        // image: true, // Si vous avez des photos de profil
      },
    });

    return { success: true, data: members };
  } catch (error) {
    console.error("Erreur Fetch Members:", error);
    return { success: false, data: [] };
  }
}
