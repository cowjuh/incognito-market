-- AlterTable
ALTER TABLE "Update" ADD COLUMN     "cta_link" TEXT,
ADD COLUMN     "cta_text" TEXT;

-- CreateIndex
CREATE INDEX "cta_index" ON "Update"("cta_text", "cta_link");
