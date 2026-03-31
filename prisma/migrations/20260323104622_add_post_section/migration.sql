/*
  Warnings:

  - Added the required column `section` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostSection" AS ENUM ('ALIMENTATION', 'LOGEMENT', 'SANTE', 'REPRODUCTION', 'ASTUCE');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "section" "PostSection" NOT NULL;
