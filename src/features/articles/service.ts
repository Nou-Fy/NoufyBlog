import "server-only";
import * as repo from "@/features/articles/repo";

export async function archiveArticle(id: string) {
  return await repo.archivePostById(id);
}

export async function getArticleDetail(id: string) {
  return await repo.findPostDetailById(id);
}

export async function getArticles(filters: {
  query?: string;
  category?: string;
  date?: string;
  sort?: string;
}) {
  return await repo.listPosts(filters);
}

