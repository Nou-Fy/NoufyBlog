// @/services/articles.service.ts
import { prisma } from "@/lib/prisma";
import { PostSection } from "@prisma/client";

export async function getArticles(filters: {
  query?: string;
  category?: string;
  date?: string;
  sort?: string;
}) {
  const { query, category, date, sort } = filters;

  const sectionFilter =
    category && category !== "ALL" ? (category as PostSection) : undefined;

  let dateFilter = {};
  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    dateFilter = {
      createdAt: { gte: startOfDay, lte: endOfDay },
    };
  }

  return await prisma.post.findMany({
    where: {
      archived: false, // 1. On ne récupère que les articles non archivés
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { content: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        sectionFilter ? { section: sectionFilter } : {},
        dateFilter,
      ],
    },
    // 2. TRÈS IMPORTANT : On inclut l'auteur pour éviter l'erreur "undefined (reading 'id')"
    include: {
      author: {
        select: {
          id: true,
          nom: true,
        },
      },
    },
    orderBy: {
      createdAt: sort === "asc" ? "asc" : "desc",
    },
  });
}
