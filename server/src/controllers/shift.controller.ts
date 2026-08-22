import type { Request, Response } from "express";
import ShiftModel from "../models/shift.model";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateSchema } from "../middlewares/zod.middleware";

export default {
    getShifts: [
        jwtAccessAuth,
        async (_req: Request, res: Response) => {
            const shifts = ShiftModel.getShiftLogs();

            return res.json({ shifts });
        },
    ],
};
