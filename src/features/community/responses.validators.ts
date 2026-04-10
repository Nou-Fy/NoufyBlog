import { z } from "zod";
import { optionalStoredImageUrl } from "@/lib/validator/image-url";

export const createResponseSchema = z.object({
  content: z.string().min(1, "Le message ne peut pas être vide").max(500),
  imageUrl: optionalStoredImageUrl,
  discussionId: z.string().min(1),
  authorId: z.string().min(1),
});

export const listResponsesQuerySchema = z.object({
  discussionId: z.string().min(1),
});

export const archiveResponseParamsSchema = z.object({
  id: z.string().min(1),
});

export type CreateResponseInput = z.infer<typeof createResponseSchema>;

