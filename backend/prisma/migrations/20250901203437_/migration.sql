/*
  Warnings:

  - You are about to drop the column `unidade` on the `CadastroDbv` table. All the data in the column will be lost.
  - Added the required column `unidadeId` to the `CadastroDbv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CadastroDbv" DROP COLUMN "unidade",
ADD COLUMN     "unidadeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Unidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "pontuacao" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unidade_nome_key" ON "public"."Unidade"("nome");

-- AddForeignKey
ALTER TABLE "public"."CadastroDbv" ADD CONSTRAINT "CadastroDbv_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "public"."Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
