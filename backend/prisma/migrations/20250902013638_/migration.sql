/*
  Warnings:

  - You are about to drop the column `idade` on the `CadastroDbv` table. All the data in the column will be lost.
  - Added the required column `dataNascimento` to the `CadastroDbv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CadastroDbv" DROP COLUMN "idade",
ADD COLUMN     "dataNascimento" TEXT NOT NULL;
