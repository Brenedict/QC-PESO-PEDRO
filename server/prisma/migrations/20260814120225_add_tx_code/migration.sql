/*
  Warnings:

  - A unique constraint covering the columns `[txCode]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `txCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "txCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_txCode_key" ON "Transaction"("txCode");
