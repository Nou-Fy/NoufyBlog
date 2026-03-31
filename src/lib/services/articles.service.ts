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

  // On vérifie que la catégorie existe et n'est pas "ALL" avant de filtrer
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
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { content: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        // Si sectionFilter est undefined, Prisma ignore simplement cette condition
        sectionFilter ? { section: sectionFilter } : {},
        dateFilter,
      ],
    },
    orderBy: {
      createdAt: sort === "asc" ? "asc" : "desc",
    },
  });
}
