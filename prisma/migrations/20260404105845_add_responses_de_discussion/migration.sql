/*
  Warnings:

  - The `region` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Region" AS ENUM ('ANALAMANGA', 'VAKINANKARATRA', 'ITASY', 'BONGOLAVA', 'DIANA', 'SAVA', 'SOFIA', 'BOENY', 'BETSIBOKA', 'MELAKY', 'ALAOTRA_MANGORO', 'ATSINANANA', 'ANALANJIROFO', 'AMORON_I_MANIA', 'HAUTE_MATSIATRA', 'VATOVAVY', 'FITOVINANY', 'ATSIMO_ATSINANANA', 'IHOROMBE', 'ATSIMO_ANDREFANA', 'ANDROY', 'ANOSY', 'MENABE');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "region",
ADD COLUMN     "region" "Region";

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "imageUrl" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Response_discussionId_idx" ON "Response"("discussionId");

-- CreateIndex
CREATE INDEX "Response_authorId_idx" ON "Response"("authorId");

-- CreateIndex
CREATE INDEX "Response_parentId_idx" ON "Response"("parentId");

-- CreateIndex
CREATE INDEX "Comment_authorId_idx" ON "Comment"("authorId");

-- CreateIndex
CREATE INDEX "Comment_postId_idx" ON "Comment"("postId");

-- CreateIndex
CREATE INDEX "Comment_discussionId_idx" ON "Comment"("discussionId");

-- CreateIndex
CREATE INDEX "Discussion_authorId_idx" ON "Discussion"("authorId");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "guides_authorId_idx" ON "guides"("authorId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Response"("id") ON DELETE SET NULL ON UPDATE CASCADE;
