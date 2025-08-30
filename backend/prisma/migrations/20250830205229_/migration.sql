/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `CadastroDbv` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricula` to the `CadastroDbv` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `numero` on the `CadastroDbv` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CadastroDbv" ADD COLUMN     "matricula" INTEGER NOT NULL,
DROP COLUMN "numero",
ADD COLUMN     "numero" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CadastroDbv_matricula_key" ON "CadastroDbv"("matricula");
