import { getForumStats } from "@/features/community/forum-stats.service";

export async function GET() {
  const stats = await getForumStats();
  return Response.json(stats);
}
