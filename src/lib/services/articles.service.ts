// @/services/articles.service.ts
import { getArticles as getArticlesFeature } from "@/features/articles/service";

export async function getArticles(filters: {
  query?: string;
  category?: string;
  date?: string;
  sort?: string;
}) {
  return await getArticlesFeature(filters);
}
