import "server-only";
import { prisma } from "@/lib/prisma";

export async function createDiscussion(data: {
  content: string;
  imageUrl?: string | null;
  authorId: string;
}) {
  return await prisma.discussion.create({
    data: {
      content: data.content,
      imageUrl: data.imageUrl?.trim() ? data.imageUrl.trim() : null,
      authorId: data.authorId,
    },
  });
}

export async function archiveDiscussionById(id: string) {
  return await prisma.discussion.update({
    where: { id },
    data: { archived: true },
  });
}

export async function listPaginatedDiscussions(options: {
  page: number;
  pageSize: number;
  sortBy: "newest" | "popular";
}) {
  const skip = (options.page - 1) * options.pageSize;
  const orderBy =
    options.sortBy === "popular"
      ? ({ comments: { _count: "desc" } } as const)
      : ({ createdAt: "desc" } as const);

  const [discussions, total] = await Promise.all([
    prisma.discussion.findMany({
      take: options.pageSize,
      skip,
      orderBy,
      include: {
        author: { select: { id: true, nom: true } },
        _count: { select: { comments: true } },
      },
    }),
    prisma.discussion.count(),
  ]);

  return { discussions, total };
}

export async function listDiscussionsForList() {
  return await prisma.discussion.findMany({
    include: { author: true, _count: { select: { comments: true } } },
    orderBy: { createdAt: "desc" },
  });
}

