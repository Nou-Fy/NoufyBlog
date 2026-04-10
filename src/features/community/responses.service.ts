import "server-only";
import * as repo from "@/features/community/responses.repo";
import type { CreateResponseInput } from "@/features/community/responses.validators";

export async function createResponse(input: CreateResponseInput) {
  return await repo.createResponse(input);
}

export async function listResponses(discussionId: string) {
  return await repo.listResponsesByDiscussion(discussionId);
}

export async function archiveResponse(id: string) {
  return await repo.archiveResponseById(id);
}

