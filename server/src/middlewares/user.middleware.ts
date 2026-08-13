import type { Request, Response, NextFunction } from "express";
import type { User } from "../../generated/prisma/client";
import { UserSchema, UpdateUserSchema } from "../../schema/users";

export const validateUserSchema =
    (schema: typeof UserSchema | typeof UpdateUserSchema) => (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.safeParse(req.body as User);

            if (!result.success) {
                return res.status(400).json(result.error.flatten().fieldErrors);
            }

            req.body = result.data;
            next();
        } catch (err) {
            res.status(500).json({ error: "Server error during validation." });
        }
    };
