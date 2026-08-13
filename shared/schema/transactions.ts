import { z } from "zod";
import { zfd } from "zod-form-data";

export const TransactionSchema = zfd.formData({
    id: zfd.text(z.string().optional()),
    applicantFirstName: zfd.text(z.string().trim().nonempty({ message: "Applicant first name cannot be empty" })),
    applicantLastName: zfd.text(z.string().trim().nonempty({ message: "Applicant last name cannot be empty" })),
    transactionType: zfd.text(z.string()),
    applicantSex: zfd.text(z.string()),
    transactionOutcome: zfd.text(z.string()),
    firstTimeJobSeeker: zfd.checkbox().default(false),
    personsWithDisability: zfd.checkbox().default(false),
    seniorCitizen: zfd.checkbox().default(false),
    youngWorker: zfd.checkbox().default(false),
    workImmersionInternship: zfd.checkbox().default(false),
    remarks: zfd.text(z.string().optional()),
});

export type Transaction = z.infer<typeof TransactionSchema>;
