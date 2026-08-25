// General Imports
import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validateSchema =
    (type: "body" | "query", schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.safeParse(req[type]);

            if (!result.success) {
                return res.status(400).json({ error: z.prettifyError(result.error) });
            }

            req[type] = result.data;
            next();
        } catch (_err) {
            res.status(500).json({ error: "Server error during validation." });
        }
    };
