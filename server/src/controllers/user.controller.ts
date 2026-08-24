// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import {
    UserFormCreateSchema,
    UserFormUpdateSchema,
    UserQuerySchema,
    type UserQueryType,
} from "@qcpesopedro/shared/schema/users";
import type { Role, Status, User } from "@qcpesopedro/shared/prisma/client";
import { AccessLevel } from "@qcpesopedro/shared/accessLevel";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";

// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import { requireAccessLevel } from "../middlewares/authorized.middleware";

// Models
import UserModel from "../models/user.model";
import ShiftModel from "../models/shift.model";

// Service
import UserService from "../service/user.service";

export default {
    getCurrentUser: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        async (req: Request, res: Response) => {
            const user = req.user as User;

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const shiftLogId =
                (await UserService.getMostRecentUnfinishedShift(user.id))?.id ||
                (await ShiftModel.createShift({ data: { userId: user.id } })).id;

            const userContextPayload: UserContextType = {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                status: user.status,
                firstName: user.firstName,
                lastName: user.lastName,
                shiftLogId,
            };

            return res.json(userContextPayload);
        },
    ],

    getUserById: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        async (req: Request, res: Response) => {
            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            return res.status(200).json(user);
        },
    ],

    getUsers: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        validateSchema("query", UserQuerySchema),
        async (req: Request, res: Response) => {
            // Retrieves users with optional filters
            const total = await UserModel.count();
            const { active, inactive } = await UserService.getActiveAndInactiveCount();
            const roles = await UserService.getRolesCount();
            const users = await UserService.getUsers(req.query as unknown as UserQueryType, {
                orderBy: { fullName: "asc" },
            });

            return res.status(200).json({ total, active, inactive, roles, users });
        },
    ],

    createUser: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        validateSchema("body", UserFormCreateSchema),
        async (req: Request, res: Response) => {
            const user = req.body as User;
            const { email, username } = user;

            if (await UserService.emailExist(email))
                return res.status(409).json({ message: "Email already registered" });

            if (await UserService.usernameExist(username))
                return res.status(409).json({ message: "Username already exists" });

            const result = await UserService.createUser(user);

            return res.json(result);
        },
    ],

    patch: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        validateSchema("body", UserFormUpdateSchema),
        async (req: Request, res: Response) => {
            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const requestor = req.user as User;

            const userUpdate = req.body as User;

            if (requestor.role === "ADMIN" && userUpdate.role === "SUPERADMIN") {
                return res.status(403).json({ message: "Forbidden: Cannot grant Super Administrator privileges." });
            }

            const result = await UserService.updateUser(userId, userUpdate);

            return res.status(201).json(result);
        },
    ],

    delete: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        async (req: Request, res: Response) => {
            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const result = await UserModel.deleteById(userId);

            return res.status(204).json(result);
        },
    ],

    resetPassword: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        async (req: Request, res: Response) => {
            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const result = await UserService.resetPassword(userId, user);

            return res.status(204).json(result);
        },
    ],
};
