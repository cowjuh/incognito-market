/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shop_username_key" ON "Shop"("username");
