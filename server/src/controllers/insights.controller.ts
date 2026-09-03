// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";
import { InsightsRequestSchema, type InsightsRequestType } from "@qcpesopedro/shared/schema/insights";

// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { requireAccessLevel } from "../middlewares/authorized.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import cache from "../middlewares/cache.middleware";

// Service
import OllamaService from "../service/ollama.service";

export default {
    postInsights: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.SUPERADMIN),
        validateSchema("body", InsightsRequestSchema),
        cache("5 minutes"),
        async (req: Request, res: Response) => {
            const { focus, ...analytics } = req.body as InsightsRequestType;

            try {
                console.log("==========================================");
                console.log(
                    "Generating insights for analytics:",
                    JSON.stringify(analytics, null, 2),
                    "with focus:",
                    JSON.stringify(focus, null, 2)
                );
                console.log("==========================================");

                const insights = await OllamaService.generateAnalyticsInsight(analytics, focus);

                console.log("==========================================");
                console.log("Generated insights:", `\n${JSON.stringify(Object.values(insights).join("\n"), null, 2)}`);
                console.log("==========================================");

                res.json({ analytics, insights });
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
