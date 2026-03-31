import { z } from "zod";
import { PostSection } from "@prisma/client";

export const CreatePostSchema = z.object({
  title: z.string().min(5, "Le titre doit faire au moins 5 caractères"),
  content: z.string().min(20, "Le contenu est trop court"),
  section: z.nativeEnum(PostSection),
  imageUrl: z
    .string()
    .url("L'URL de l'image n'est pas valide")
    .optional()
    .or(z.literal("")),
});

// Type inféré pour TypeScript
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
