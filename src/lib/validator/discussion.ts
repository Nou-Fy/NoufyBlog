// src/lib/validation/discussion.ts
import * as z from "zod";
import { optionalStoredImageUrl } from "@/lib/validator/image-url";

export const discussionSchema = z.object({
  content: z
    .string()
    .min(1, "Le message ne peut pas être vide")
    .max(500, "Le message ne doit pas dépasser 500 caractères"),
  imageUrl: optionalStoredImageUrl,
});

export type DiscussionFormValues = z.infer<typeof discussionSchema>;
