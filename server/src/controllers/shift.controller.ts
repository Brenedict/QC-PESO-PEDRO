import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import ShiftService from "../service/shift.service";
import {
    ShiftFormEndSchema,
    ShiftFormVerifySchema,
    ShiftQuerySchema,
    type ShiftFormEndType,
    type ShiftFormVerifyType,
    type ShiftQueryType,
} from "@qcpesopedro/shared/schema/shift";
import ShiftModel from "../models/shift.model";
import { AccessLevel } from "@qcpesopedro/shared/accessLevel";
import { requireAccessLevel } from "../middlewares/authorized.middleware";

export default {
    getShifts: [
        jwtAccessAuth,
        validateSchema("query", ShiftQuerySchema),
        async (req: Request, res: Response) => {
            const { startDate, endDate } = req.query as unknown as ShiftQueryType;
            const data = await ShiftService.getShiftOverview(startDate, endDate);
            return res.json(data);
        },
    ],

    getShift: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const { shiftId } = req.params;
            if (!shiftId) return res.status(404).json({ error: "Shift not found" });

            const details = await ShiftService.getShiftDetails(Number(shiftId));
            const shift = await ShiftModel.getShiftLogById(Number(shiftId), { user: true });

            return res.json({ ...details, shift });
        },
    ],

    patchShiftEnd: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("body", ShiftFormEndSchema),
        async (req: Request, res: Response) => {
            const { shiftId } = req.params;
            const { generalRemarks, environmentTags } = req.body as unknown as ShiftFormEndType;

            if (!shiftId) return res.status(404).json({ error: "Shift not found" });

            await ShiftModel.updateShiftById(Number(shiftId), {
                timeOut: new Date(),
                status: "PENDING",
                generalRemarks,
                environmentTags,
            });
            return res.sendStatus(204);
        },
    ],

    patchShiftVerify: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        validateSchema("body", ShiftFormVerifySchema),
        async (req: Request, res: Response) => {
            const { shiftId } = req.params;
            const { status, adminRemarks } = req.body as unknown as ShiftFormVerifyType;

            if (!shiftId) return res.status(404).json({ error: "Shift not found" });

            await ShiftModel.updateShiftById(Number(shiftId), {
                lastVerifiedAt: new Date(),
                status,
                adminRemarks,
            });
            return res.sendStatus(204);
        },
    ],
};
