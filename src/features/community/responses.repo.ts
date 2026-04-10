import "server-only";
import { prisma } from "@/lib/prisma";
import type { CreateResponseInput } from "@/features/community/responses.validators";

export async function createResponse(data: CreateResponseInput) {
  return await prisma.response.create({
    data: {
      content: data.content,
      imageUrl: data.imageUrl?.trim() ? data.imageUrl.trim() : null,
      discussionId: data.discussionId,
      authorId: data.authorId,
    },
  });
}

export async function listResponsesByDiscussion(discussionId: string) {
  return await prisma.response.findMany({
    where: { discussionId },
    include: {
      author: { select: { nom: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function archiveResponseById(id: string) {
  return await prisma.response.update({
    where: { id },
    data: { archived: true },
  });
}

