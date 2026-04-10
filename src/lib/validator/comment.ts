import { z } from "zod";
import { optionalStoredImageUrlFromForm } from "@/lib/validator/image-url";

export const articleCommentFormSchema = z.object({
  content: z.coerce.string().min(1, "Le commentaire ne peut pas être vide"),
  postId: z.coerce.string().min(1),
  imageUrl: optionalStoredImageUrlFromForm,
});

export type ArticleCommentFormInput = z.infer<typeof articleCommentFormSchema>;
