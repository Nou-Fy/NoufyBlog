import { prisma } from "@/lib/prisma";
import { CreatePostInput } from "../validator/post";

export async function createPost(data: CreatePostInput, authorId: string) {
  return await prisma.post.create({
    data: {
      ...data,
      imageUrl: data.imageUrl || null,
      authorId,
    },
  });
}

export async function addComment(
  content: string,
  postId: string,
  authorId: string,
) {
  return await prisma.comment.create({
    data: { content, postId, authorId },
  });
}
