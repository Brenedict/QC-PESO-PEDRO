// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import type { User } from "@qcpesopedro/shared/prisma/browser";
import type { NotificationFeedResponseType } from "@qcpesopedro/shared/schema/notification";

// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";

// Service
import NotificationService from "../service/notification.service";

export default {
    getAll: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User | undefined;

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const feed: NotificationFeedResponseType = (await NotificationService.getNotificationsForUser(
                user.id
            )) as NotificationFeedResponseType;

            return res.status(200).json(feed);
        },
    ],

    markAllRead: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User | undefined;

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await NotificationService.markAllRead(user.id);

            return res.sendStatus(200);
        },
    ],
};
