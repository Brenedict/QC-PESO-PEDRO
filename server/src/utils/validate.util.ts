// General Imports
import { z } from "zod";
import type { Response } from "express";

// PEDRO SHARED IMPORTS
import type { TransactionCountArgs, TransactionGroupByArgs } from "@qcpesopedro/shared/prisma/models";

export default {
    isGroupByArgs(args: TransactionGroupByArgs | TransactionCountArgs | undefined): args is TransactionGroupByArgs {
        if (!args) return false;
        return "by" in args && args.by?.length > 0;
    },
    validateRequestData<T extends z.ZodType>(schema: T, data: unknown, res: Response) {
        const result = schema.safeParse(data);

        if (!result.success) {
            res.status(400).json({
                error: z.prettifyError(result.error),
            });
        }

        return result;
    },
};
