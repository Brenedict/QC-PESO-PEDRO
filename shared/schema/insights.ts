// General Imports
import { z } from "zod";
import { TransactionAnalyticsQuerySchema } from "./transactions";

export const InsightsRequestSchema = TransactionAnalyticsQuerySchema.unwrap().extend({
    focus: z.string().max(300).optional(),
});

export type InsightsRequestType = z.infer<typeof InsightsRequestSchema>;
