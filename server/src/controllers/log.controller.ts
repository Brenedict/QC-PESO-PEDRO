import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import type { User } from "@qcpesopedro/shared/prisma/client";

import LogModel from "../models/log.model";
import LogService from "../service/log.service";
import { requireAccessLevel } from "../middlewares/authorized.middleware";
import { AccessLevel } from "@qcpesopedro/shared/enums";
import { AccountLogQueryOverviewSchema, type AccountLogQueryOverviewType } from "@qcpesopedro/shared/schema/login";
import { validateSchema } from "../middlewares/zod.middleware";
import UserModel from "../models/user.model";

export default {
    getOverview: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        validateSchema("query", AccountLogQueryOverviewSchema),
        async (req: Request, res: Response) => {
            const query = req.query as unknown as AccountLogQueryOverviewType;
            const currentlyLogged = await LogService.getCurrentlyLogged(query);
            const totalLogIn = await LogService.getTotalLogIn(query);
            const totalLogOut = await LogService.getTotalLogOut(query);
            const avgSession = await LogService.getAvgSessionDuration(query);
            const accountLogs = await LogService.getAccountLogOverview(query);

            const result = {
                currentlyLogged,
                totalLogIn,
                totalLogOut,
                avgSession,
                accountLogs,
            };

            return res.json(result);
        },
    ],

    getAccountLog: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        async (req: Request, res: Response) => {
            const { userId } = req.params;

            if (!userId || isNaN(Number(userId))) return res.status(404).json({ error: "User not found" });

            const user = (await UserModel.getById(Number(userId)))?.fullName;
            const accountLogs = await LogService.getLogOuts(Number(userId));
            return res.json({ user, accountLogs });
        },
    ],
};
