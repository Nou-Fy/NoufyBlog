// src/lib/validation/discussion.ts
import * as z from "zod";

export const discussionSchema = z.object({
  content: z
    .string()
    .min(1, "Le message ne peut pas être vide")
    .max(500, "Le message ne doit pas dépasser 500 caractères"),
  imageUrl: z.string().url("Lien invalide").optional().or(z.literal("")),
});

export type DiscussionFormValues = z.infer<typeof discussionSchema>;
