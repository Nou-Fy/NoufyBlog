import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, imageUrl, authorId, section } = body;

  const post = await prisma.post.create({
    data: { title, content, imageUrl, authorId, section },
  });

  return NextResponse.json(post);
}
