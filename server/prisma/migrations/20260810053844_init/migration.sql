-- CreateEnum
CREATE TYPE "LogAction" AS ENUM ('TRANSACTION_CREATE', 'TRANSACTION_EDIT', 'TRANSACTION_DELETE', 'SUBMIT_ESS', 'TAG_ESS_REJECT', 'TAG_ESS_REVISION', 'TAG_ESS_APPROVE', 'USER_ADD', 'USER_RESET_PASSWORD', 'USER_EDIT', 'USER_PROMOTE', 'USER_DEMOTE', 'REPORTS_DOWNLOAD_DAILY', 'REPORTS_DOWNLOAD_WEEKLY', 'REPORTS_DOWNLOAD_MONTHLY', 'REPORTS_DOWNLOAD_OVERALL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONLINE', 'OFFLINE', 'LOGGED_OUT');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'ADMIN', 'FRONTLINE');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('MORNING', 'AFTERNOON');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('WALK_IN_REFERRAL', 'ONLINE_REFERRAL', 'IN_HOUSE_RECRUITMENT');

-- CreateEnum
CREATE TYPE "Outcome" AS ENUM ('PENDING', 'MISMATCH', 'SUCCESS', 'NONE');

-- CreateEnum
CREATE TYPE "ESSStatus" AS ENUM ('PENDING', 'REJECTED', 'REVISION', 'APPROVED');

-- CreateEnum
CREATE TYPE "Demographic" AS ENUM ('FIRST_TIME_JOB_SEEKER', 'PERSONS_WITH_DISABILITY', 'SENIOR_CITIZEN', 'YOUNG_WORKER', 'WORK_IMMERSION_INTERNSHIP');

-- CreateEnum
CREATE TYPE "EnvironmentTag" AS ENUM ('SLOW_INTERNET', 'HEAVY_RAIN', 'BROKEN_EQUIPMENT', 'APPLICANT_ISSUES', 'FEELING_UNWELL', 'BROKEN_SOFTWARE_SYSTEM');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shiftLogId" INTEGER NOT NULL,
    "applicantFirstName" VARCHAR(256) NOT NULL,
    "applicantLastName" VARCHAR(256) NOT NULL,
    "applicantSex" "Sex" NOT NULL,
    "transactionOutcome" "Outcome" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionType" "TransactionType" NOT NULL DEFAULT 'WALK_IN_REFERRAL',
    "remarks" TEXT,
    "demographics" "Demographic"[],

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShiftLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "timeIn" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeOut" TIMESTAMPTZ(0),
    "status" "ESSStatus" NOT NULL DEFAULT 'PENDING',
    "generalRemarks" TEXT,
    "adminRemarks" TEXT,
    "lastVerifiedBy" TEXT,
    "lastVerifiedAt" TIMESTAMPTZ(0),
    "environmentTags" "EnvironmentTag"[],

    CONSTRAINT "ShiftLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'FRONTLINE',
    "status" "Status" NOT NULL,
    "shift" "Shift" NOT NULL,
    "firstName" VARCHAR(256) NOT NULL,
    "lastName" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actionPerformed" "LogAction" NOT NULL,
    "affectedRecordId" INTEGER NOT NULL,
    "changesDetails" TEXT NOT NULL,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "logIn" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logOut" TIMESTAMPTZ(0),
    "reason" TEXT,
    "remarks" TEXT,

    CONSTRAINT "AccountLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_shiftLogId_fkey" FOREIGN KEY ("shiftLogId") REFERENCES "ShiftLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftLog" ADD CONSTRAINT "ShiftLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountLog" ADD CONSTRAINT "AccountLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
