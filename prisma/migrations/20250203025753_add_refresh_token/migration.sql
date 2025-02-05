/*
  Warnings:

  - A unique constraint covering the columns `[refeshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refeshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_refeshToken_key" ON "User"("refeshToken");
