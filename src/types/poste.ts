import { PostSection } from "@prisma/client";

export interface CreatePostInput {
  title: string;
  content: string;
  imageUrl?: string;
  section: PostSection;
  authorId: string;
}
