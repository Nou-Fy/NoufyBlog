import "server-only";
import * as repo from "@/features/community/discussions.repo";

export async function createDiscussion(input: {
  content: string;
  imageUrl?: string | null;
  authorId: string;
}) {
  return await repo.createDiscussion(input);
}

export async function archiveDiscussion(id: string) {
  return await repo.archiveDiscussionById(id);
}

export async function getPaginatedDiscussions(options: {
  page?: number;
  sortBy?: string;
}) {
  const pageSize = 10;
  const page = options.page && options.page > 0 ? options.page : 1;
  const sortBy = options.sortBy === "popular" ? "popular" : "newest";

  const { discussions, total } = await repo.listPaginatedDiscussions({
    page,
    pageSize,
    sortBy,
  });

  return {
    discussions,
    totalPages: Math.ceil(total / pageSize) || 1,
    currentPage: page,
  };
}

