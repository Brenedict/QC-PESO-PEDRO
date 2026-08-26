import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import ShiftService from "../service/shift.service";
import {
    ShiftDetailsQuerySchema,
    ShiftFormEndSchema,
    ShiftFormCreateSchema,
    ShiftFormVerifySchema,
    ShiftQuerySchema,
    type ShiftDetailsQueryType,
    type ShiftFormEndType,
    type ShiftFormCreateType,
    type ShiftFormVerifyType,
    type ShiftQueryType,
} from "@qcpesopedro/shared/schema/shift";
import ShiftModel from "../models/shift.model";
import { AccessLevel } from "@qcpesopedro/shared/enums";
import { requireAccessLevel, requireTimeIn } from "../middlewares/authorized.middleware";
import type { ShiftLogOrderByWithRelationInput } from "@qcpesopedro/shared/prisma/models";

export default {
    getShifts: [
        jwtAccessAuth,
        validateSchema("query", ShiftQuerySchema),
        async (req: Request, res: Response) => {
            const { startDate, endDate, status, search, include } = req.query as unknown as ShiftQueryType;
            const data = await ShiftService.getShiftOverview(
                startDate,
                endDate,
                {
                    status,
                    user: { fullName: { contains: search, mode: "insensitive" } },
                },
                [{ timeIn: "desc" }, { timeOut: "desc" }] as ShiftLogOrderByWithRelationInput,
                include
            );
            return res.json(data);
        },
    ],

    getShift: [
        jwtAccessAuth,
        validateSchema("query", ShiftDetailsQuerySchema),
        async (req: Request, res: Response) => {
            const query = req.query as unknown as ShiftDetailsQueryType;
            const { shiftId } = req.params;

            if (!shiftId) return res.status(404).json({ error: "Shift not found" });

            const details =
                query?.overview?.length && query.overview.length > 0
                    ? await ShiftService.getShiftDetails(Number(shiftId), query)
                    : {};

            const { include } = query;

            const shift = include?.includes("shift")
                ? await ShiftModel.getShiftLogById(Number(shiftId), {
                      user: !!include?.includes("user"),
                      transactions: !!include?.includes("transactions"),
                  })
                : undefined;

            return res.json({ ...details, shift });
        },
    ],

    createShift: [
        jwtAccessAuth,
        validateSchema("body", ShiftFormCreateSchema),
        async (req: Request, res: Response) => {
            const { timeIn, userId } = req.body as unknown as ShiftFormCreateType;

            await ShiftModel.createShift({
                data: {
                    timeIn,
                    userId,
                },
            });
            return res.status(200).json({ message: "Shift created" });
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
            const { status, adminRemarks, verifierId } = req.body as unknown as ShiftFormVerifyType;

            if (!shiftId) return res.status(404).json({ error: "Shift not found" });

            await ShiftModel.updateShiftById(Number(shiftId), {
                lastVerifiedAt: new Date(),
                status,
                adminRemarks,
                verifierId,
            });
            return res.sendStatus(204);
        },
    ],

    getShiftStatus: [
        jwtAccessAuth,
        requireTimeIn,
        async (_req: Request, res: Response) => {
            return res.json({ message: "Shift status check passed" });
        },
    ],
};
