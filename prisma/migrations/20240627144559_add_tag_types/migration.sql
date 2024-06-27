-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "tagTypeId" TEXT;

-- CreateTable
CREATE TABLE "TagType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagType_name_key" ON "TagType"("name");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagTypeId_fkey" FOREIGN KEY ("tagTypeId") REFERENCES "TagType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
