"use server";

import { getSessionUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { addComment } from "@/lib/services/post.service";

export async function addCommentAction(formData: FormData) {
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;
  const authorId = await getSessionUser();

  if (!authorId || !content) return;

  await addComment(content, postId, authorId);

  revalidatePath("/articles");
}
