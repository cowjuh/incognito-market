/*
  Warnings:

  - You are about to drop the column `cta_link` on the `Update` table. All the data in the column will be lost.
  - You are about to drop the column `cta_text` on the `Update` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "cta_index";

-- AlterTable
ALTER TABLE "Update" DROP COLUMN "cta_link",
DROP COLUMN "cta_text",
ADD COLUMN     "callToActionLink" TEXT,
ADD COLUMN     "callToActionText" TEXT;
