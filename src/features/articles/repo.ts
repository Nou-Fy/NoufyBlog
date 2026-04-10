import "server-only";
import { prisma } from "@/lib/prisma";
import { PostSection } from "@prisma/client";

export async function archivePostById(id: string) {
  return await prisma.post.update({
    where: { id },
    data: { archived: true },
  });
}

export async function findPostDetailById(id: string) {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function listPosts(filters: {
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
      archived: false,
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

