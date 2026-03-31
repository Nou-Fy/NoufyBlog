-- DropForeignKey
ALTER TABLE "guides" DROP CONSTRAINT "guides_authorId_fkey";

-- AlterTable
ALTER TABLE "guides" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "guides" ADD CONSTRAINT "guides_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
