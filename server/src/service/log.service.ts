import prisma from "../config/prisma.config";
import LogModel from "../models/log.model";
import { calcAvgSessionDuration, getUserAccountLog } from "@qcpesopedro/shared/prisma/sql";
import DateUtil from "../utils/date.util";
import jwt from "jsonwebtoken";
import type { Request } from "express";
import UserModel from "../models/user.model";
import type { Role, Status } from "@qcpesopedro/shared/prisma/browser";
import type { AccountLogQueryOverviewType } from "@qcpesopedro/shared/schema/login";

export default {
    async getCurrentlyLogged(query: AccountLogQueryOverviewType) {
        const { startDate, endDate } = query;
        return LogModel.count({
            where: {
                logOut: null,
                logIn:
                    startDate || endDate
                        ? {
                              ...(startDate && { gte: startDate }),
                              ...(endDate && { lte: endDate }),
                          }
                        : undefined,
            },
        });
    },
    async getTotalLogIn(query: AccountLogQueryOverviewType) {
        const { startDate, endDate } = query;
        return LogModel.count({
            where: {
                logIn:
                    startDate || endDate
                        ? {
                              ...(startDate && { gte: startDate }),
                              ...(endDate && { lte: endDate }),
                          }
                        : undefined,
            },
        });
    },
    async getTotalLogOut(query: AccountLogQueryOverviewType) {
        const { startDate, endDate } = query;
        return LogModel.count({
            where: {
                logOut: {
                    not: null,
                    ...(startDate || endDate
                        ? {
                              ...(startDate && { gte: startDate }),
                              ...(endDate && { lte: endDate }),
                          }
                        : undefined),
                },
            },
        });
    },

    async getLatestLog(userId: number) {
        return (
            await LogModel.getAccountLogs({
                where: { userId },
                orderBy: { logIn: "asc" },
                take: 1,
            })
        )?.[0];
    },

    async getLatestOpenLog(userId: number) {
        return (
            await LogModel.getAccountLogs({
                where: { userId, logOut: null },
                orderBy: { logIn: "desc" },
                take: 1,
            })
        )?.[0];
    },

    async getAvgSessionDuration(query: AccountLogQueryOverviewType) {
        const { startDate, endDate } = query;
        const result = await prisma.$queryRawTyped(calcAvgSessionDuration(startDate ?? null, endDate ?? null));
        const firstRow = result[0];
        const averageSecondsNum = firstRow?.averageSeconds ? firstRow.averageSeconds.toNumber() : 0;
        return DateUtil.formatInterval(averageSecondsNum);
    },

    async getAccountLogOverview(query: AccountLogQueryOverviewType) {
        const { endDate, startDate, role, status, search } = query;
        const result = await prisma.$queryRawTyped(
            getUserAccountLog(startDate ?? null, endDate ?? null, role ?? null, status ?? null, search ?? null)
        );
        return result;
    },

    async closeLatestOpenLog(userId: number, reason?: string, remarks?: string) {
        const openLog = await this.getLatestOpenLog(userId);
        if (!openLog) return null;

        await UserModel.updateUser(userId, { status: "LOGGED_OUT" });
        return LogModel.updateAccountLogById(openLog.id, {
            logOut: new Date(),
            reason,
            remarks,
        });
    },

    async openAccountLog(userId: number) {
        await LogModel.createAccountLog({ userId });
        await UserModel.updateUser(userId, { status: "ONLINE" });
    },

    async closeOpenLogOnExpiredRefresh(req: Request) {
        try {
            const token = req.cookies?.refreshToken;
            if (!token) return;

            const payload = jwt.decode(token) as { sub?: number | string } | null;
            const userId = Number(payload?.sub);
            if (!Number.isFinite(userId)) return;

            await UserModel.updateUser(userId, { status: "LOGGED_OUT" });
            await LogModel.updateAccountLogsByUserId(userId, { logOut: new Date(), remarks: "Login token expired" });
        } catch {
            // skip if theres an error
        }
    },

    async getLogOuts(userId: number) {
        const result = await LogModel.getAccountLogs({
            where: { logOut: { not: null }, userId },
            orderBy: { logIn: "asc" },
        });
        return result.map((log) => {
            const logInTime = log.logIn.getTime();
            const logOutTime = log.logOut?.getTime() ?? 0;
            const durationSeconds = Math.floor((logOutTime - logInTime) / 1000);
            return {
                ...log,
                sessionDuration: DateUtil.formatInterval(durationSeconds),
            };
        });
    },
};
