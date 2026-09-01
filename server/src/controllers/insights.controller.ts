// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";
import { InsightsRequestSchema, type InsightsRequestType } from "@qcpesopedro/shared/schema/insights";
import type { TransactionAnalyticsQueryType } from "@qcpesopedro/shared/schema/transactions";

// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { requireAccessLevel } from "../middlewares/authorized.middleware";
import { validateSchema } from "../middlewares/zod.middleware";

// Service
import TransactionService from "../service/transaction.service";
import OllamaService from "../service/ollama.service";

export default {
    postInsights: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.SUPERADMIN),
        validateSchema("body", InsightsRequestSchema),
        async (req: Request, res: Response) => {
            const { focus, ...queryBody } = req.body as InsightsRequestType;

            // Reuse the exact same resolution path /transaction/analytics uses,
            // so the LLM narrates the same numbers the dashboard charts show.
            const parsedQuery = TransactionService.parseTransactionAnalyticsQuery(
                queryBody as TransactionAnalyticsQueryType
            );
            const analytics = await TransactionService.resolveAnalyticsFilter(parsedQuery);

            try {
                console.log("==========================================");
                console.log("Generating insights for analytics:", analytics, "with focus:", focus);
                console.log("==========================================");
                const insight = await OllamaService.generateAnalyticsInsight(analytics, focus);

                console.log("==========================================");
                console.log("Generated insights:", insight);
                console.log("==========================================");

                res.json({ analytics, insight });
            } catch (err) {
                // Ollama down/unreachable shouldn't break the dashboard — still return
                console.error("Ollama insight generation failed:", err);
                res.status(502).json({
                    analytics,
                    insight: null,
                    error: "Insight generation is currently unavailable.",
                });
            }
        },
    ],
};
