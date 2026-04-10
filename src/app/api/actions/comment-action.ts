"use server";

import { getSessionUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { addComment } from "@/lib/services/post.service";
import { articleCommentFormSchema } from "@/lib/validator/comment";

export async function addCommentAction(formData: FormData) {
  const authorId = await getSessionUser();
  if (!authorId) return;

  const parsed = articleCommentFormSchema.safeParse({
    content: formData.get("content"),
    postId: formData.get("postId"),
    imageUrl: formData.get("imageUrl"),
  });

  if (!parsed.success) return;

  const { content, postId, imageUrl } = parsed.data;

  await addComment(
    content,
    postId,
    authorId,
    imageUrl || null,
  );

  revalidatePath("/articles");
  revalidatePath(`/articles/${postId}`);
}
