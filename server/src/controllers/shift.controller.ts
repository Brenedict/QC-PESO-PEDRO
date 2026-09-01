// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";
import { ESSStatus, LogAction, Role, type User } from "@qcpesopedro/shared/prisma/browser";
import type { ShiftLogOrderByWithRelationInput } from "@qcpesopedro/shared/prisma/models";
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

// Models
import ShiftModel from "../models/shift.model";
import UserModel from "../models/user.model";

// Middlwares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import { requireAccessLevel, resolveShiftConflicts } from "../middlewares/authorized.middleware";
import { auditLog } from "../middlewares/audit.middleware";

// Services
import ShiftService from "../service/shift.service";
import AuditService from "../service/audit.service";

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

            const shiftLog = await ShiftModel.createShift({
                data: {
                    timeIn,
                    userId,
                },
            });

            return res.status(200).json({ shiftLog, message: "Shift created" });
        },
    ],

    patchShiftEnd: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("body", ShiftFormEndSchema),
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            const { shiftId } = req.params;
            const { generalRemarks, environmentTags } = req.body as unknown as ShiftFormEndType;
            const { role } = req.user as User;

            if (!shiftId) return res.status(404).json({ error: "Shift not found" });

            const shiftStatus = role === Role.SUPERADMIN ? ESSStatus.APPROVED : ESSStatus.PENDING;

            const result = await ShiftModel.updateShiftById(Number(shiftId), {
                timeOut: new Date(),
                status: shiftStatus,
                generalRemarks,
                environmentTags,
            });

            if (!result.userId) return res.status(404).json({ error: "User who owns the shift is not found" });

            const user = await UserModel.updateUser(result.userId, { isRevising: false });

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    LogAction.SUBMITTED_END_SHIFT_STATUS,
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "SHIFT",
                    result.id,
                    user?.fullName ?? "",
                    result?.adminRemarks ?? ""
                );
            }

            return res.status(200).json({ message: "Shift successfully ended", result });
        },
    ],

    patchShiftVerify: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        validateSchema("body", ShiftFormVerifySchema),
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            const { shiftId } = req.params;
            const { status, adminRemarks, verifierId } = req.body as unknown as ShiftFormVerifyType;

            if (!shiftId) return res.status(404).json({ error: "Shift not found" });

            // Main result following the request
            const result = await ShiftModel.updateShiftById(Number(shiftId), {
                lastVerifiedAt: new Date(),
                status,
                adminRemarks,
                verifierId,
            });

            const mapESSStatus: Record<ESSStatus, LogAction> = {
                REJECTED: LogAction.TAGGED_END_SHIFT_STATUS_REJECTED,
                REVISION: LogAction.TAGGED_END_SHIFT_STATUS_REVISION,
                APPROVED: LogAction.TAGGED_END_SHIFT_STATUS_APPROVE,

                // Technically this could never happen
                ONGOING: LogAction.TAGGED_END_SHIFT_STATUS_REVISION,
                PENDING: LogAction.TAGGED_END_SHIFT_STATUS_REVISION,
            };

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    mapESSStatus[result.status],
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "SHIFT",
                    result.id,
                    result.user?.fullName ?? "",
                    result?.adminRemarks ?? ""
                );
            }

            return res.sendStatus(204);
        },
    ],

    patchShiftRevise: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        auditLog,
        async (req: Request, res: Response) => {
            const { shiftId } = req.params;
            if (!shiftId) return res.status(404).json({ error: "Shift not found" });

            const revisionShift = await ShiftModel.getShiftLogById(Number(shiftId));
            if (!revisionShift?.userId) return res.status(404).json({ error: "User who owns the shift is not found" });

            await UserModel.updateUser(revisionShift.userId, { isRevising: true });

            return res.status(200).json({ message: "Please revise this shift", revisionShift });
        },
    ],

    getShiftStatus: [
        jwtAccessAuth,
        resolveShiftConflicts,
        async (_req: Request, res: Response) => {
            return res.json({ message: "Shift status check passed" });
        },
    ],
};
