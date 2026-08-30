// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import {
    UserFormCreateSchema,
    UserFormUpdateSchema,
    UserQuerySchema,
    type UserQueryType,
    UserFormChangePasswordSchema,
} from "@qcpesopedro/shared/schema/users";
import { LogAction, type Role, type Status, type User } from "@qcpesopedro/shared/prisma/browser";
import { AccessLevel } from "@qcpesopedro/shared/enums";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";

// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import { requireAccessLevel } from "../middlewares/authorized.middleware";

// Models
import UserModel from "../models/user.model";

// Service
import EmailService from "../service/email.service";
import UserService from "../service/user.service";
import AuditService from "../service/audit.service";

// Utils
import HashUtil from "../utils/hash.util";
import { createAuditLog } from "../middlewares/audit.middleware";

export default {
    getCurrentUser: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        async (req: Request, res: Response) => {
            const user = req.user as User;

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const shiftLog = user.isRevising
                ? await UserService.getEarliestRevisionShift(user.id)
                : await UserService.getEarliestUnfinishedShift(user.id);

            const userContextPayload: UserContextType = {
                id: user.id,
                email: user.email,
                shift: user.shift,
                username: user.username,
                role: user.role,
                status: user.status,
                firstName: user.firstName,
                lastName: user.lastName,
                isRevising: user.isRevising,
                shiftLog,
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
        createAuditLog(LogAction.USER_CREATED),
        async (req: Request, res: Response) => {
            const user = req.body as User;
            const { email, username } = user;

            if (await UserService.emailExist(email))
                return res.status(409).json({ message: "Email already registered" });

            if (await UserService.usernameExist(username))
                return res.status(409).json({ message: "Username already exists" });

            const result = await UserService.createUser(user);

            if (result) {
                res.locals.auditMetadata = {
                    user: { id: result.id, name: result.fullName, role: result.role },
                    affectedRecord: result.id,
                    changesDetails: result.fullName,
                };
            }

            return res.json(result);
        },
    ],

    patch: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        validateSchema("body", UserFormUpdateSchema),
        createAuditLog(LogAction.USER_EDITED),
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

            if (result) {
                await AuditService.createAuditLogMetadata(res, result);
            }

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

    changePassword: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("body", UserFormChangePasswordSchema),
        async (req: Request, res: Response) => {
            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const { currentPassword, newPassword, _confirmPassword } = req.body;

            // Checks if inputted password matches stored user password
            const passwordMatches = await HashUtil.comparePassword(currentPassword, user.password);

            if (!passwordMatches) {
                return res.status(422).json({ code: "INCORRECT_PASSWORD", message: "Incorrect password" });
            }

            // Checks if inputted newPassword is a duplicate of the stored user password
            const passwordDuplicate = await HashUtil.comparePassword(newPassword, user.password);

            if (passwordDuplicate) {
                return res
                    .status(422)
                    .json({ code: "DUPLICATE_PASSWORD", message: "Old Password Can't Be New Password" });
            }

            const result = UserService.changePassword(user.id, newPassword);

            EmailService.sendPasswordChangeEmail(user.firstName, user.email, user.updatedAt);

            return res.status(200).json({ message: "Password Changed Successfully" });
        },
    ],
};
