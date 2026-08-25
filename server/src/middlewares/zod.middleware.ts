// General Imports
import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validateSchema = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json(z.treeifyError(result.error));
        }

        req.body = result.data;
        next();
    } catch (_err) {
        res.status(500).json({ error: "Server error during validation." });
    }
};
