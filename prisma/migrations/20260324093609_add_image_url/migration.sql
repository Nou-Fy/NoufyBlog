/*
  Warnings:

  - The values [LOGEMENT] on the enum `PostSection` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostSection_new" AS ENUM ('ALIMENTATION', 'SANTE', 'REPRODUCTION', 'ASTUCE');
ALTER TABLE "Post" ALTER COLUMN "section" TYPE "PostSection_new" USING ("section"::text::"PostSection_new");
ALTER TYPE "PostSection" RENAME TO "PostSection_old";
ALTER TYPE "PostSection_new" RENAME TO "PostSection";
DROP TYPE "public"."PostSection_old";
COMMIT;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageUrl" TEXT;
