/*
  Warnings:

  - You are about to drop the column `lastVerifiedBy` on the `ShiftLog` table. All the data in the column will be lost.
  - Added the required column `verifierId` to the `ShiftLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ESSStatus" ADD VALUE 'ONGOING';

-- AlterTable
ALTER TABLE "ShiftLog" DROP COLUMN "lastVerifiedBy",
ADD COLUMN     "verifierId" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'ONGOING';

-- AddForeignKey
ALTER TABLE "ShiftLog" ADD CONSTRAINT "ShiftLog_verifierId_fkey" FOREIGN KEY ("verifierId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
