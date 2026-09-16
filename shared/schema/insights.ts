// General Imports
import { z } from "zod";

export const InsightsRequestSchema = z.object({
    analytics: z.unknown(),
    focus: z.record(z.string(), z.string().max(300)),
});

export type InsightsRequestType = z.infer<typeof InsightsRequestSchema>;
