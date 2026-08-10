import { z } from "zod";
import { zfd } from "zod-form-data";

// Utils
import { decode } from "../utils/hashids";

export const TransactionSchema = zfd.formData({
    id: zfd.text(z.string().optional().transform(decode)),
    applicantFirstName: zfd.text(z.string().optional()),
    applicantLastName: zfd.text(z.string().optional()),
    date: zfd.text(z.string().optional()),
    time: zfd.text(z.string().optional()),
    transactionType: zfd.text(z.string().optional()),
    applicantSex: zfd.text(z.string().optional()),
    transactionOutcome: zfd.text(z.string().optional()),
    firstTimeJobSeeker: zfd.checkbox().default(false),
    personsWithDisability: zfd.checkbox().default(false),
    seniorCitizen: zfd.checkbox().default(false),
    youngWorker: zfd.checkbox().default(false),
    workImmersionInternship: zfd.checkbox().default(false),
    remarks: zfd.text(z.string().optional()),
});

export type Transaction = z.infer<typeof TransactionSchema>;
