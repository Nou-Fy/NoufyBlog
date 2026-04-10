import { z } from "zod";
import { PostSection } from "@prisma/client";
import { optionalStoredImageUrl } from "@/lib/validator/image-url";

export const CreatePostSchema = z.object({
  title: z.string().min(5, "Le titre doit faire au moins 5 caractères"),
  content: z.string().min(20, "Le contenu est trop court"),
  section: z.nativeEnum(PostSection),
  imageUrl: optionalStoredImageUrl,
});

// Type inféré pour TypeScript
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
