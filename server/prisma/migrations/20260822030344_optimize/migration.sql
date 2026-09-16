-- DropForeignKey
ALTER TABLE "ShiftLog" DROP CONSTRAINT "ShiftLog_verifierId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN "fullName" VARCHAR(256) GENERATED ALWAYS AS ( "firstName" || ' ' || "lastName") STORED;

-- CreateIndex
CREATE INDEX "AccountLog_userId_logIn_idx" ON "AccountLog"("userId", "logIn" DESC);

-- CreateIndex
CREATE INDEX "AuditLog_userId_createdAt_idx" ON "AuditLog"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "ShiftLog_userId_idx" ON "ShiftLog"("userId");

-- CreateIndex
CREATE INDEX "ShiftLog_status_idx" ON "ShiftLog"("status");

-- CreateIndex
CREATE INDEX "ShiftLog_verifierId_idx" ON "ShiftLog"("verifierId");

-- CreateIndex
CREATE INDEX "Transaction_applicantFullName_idx" ON "Transaction"("applicantFullName");

-- CreateIndex
CREATE INDEX "Transaction_userId_createdAt_idx" ON "Transaction"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Transaction_shiftLogId_createdAt_idx" ON "Transaction"("shiftLogId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt");

-- CreateIndex
CREATE INDEX "User_fullName_idx" ON "User"("fullName");

-- CreateIndex
CREATE INDEX "User_role_status_idx" ON "User"("role", "status");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "ShiftLog" ADD CONSTRAINT "ShiftLog_verifierId_fkey" FOREIGN KEY ("verifierId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
