-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN "applicantFullName" VARCHAR(256) GENERATED ALWAYS AS ( "applicantFirstName" || ' ' || "applicantLastName") STORED;
