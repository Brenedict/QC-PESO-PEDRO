// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import {
    UserFormCreateSchema,
    UserFormUpdateSchema,
    UserQuerySchema,
    type UserQueryType,
    UserFormChangePasswordSchema,
    UserPreferencesSchema,
    type UserPreferencesType,
} from "@qcpesopedro/shared/schema/users";
import { LogAction, type User } from "@qcpesopedro/shared/prisma/browser";
import { AccessLevel } from "@qcpesopedro/shared/enums";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";

// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import { requireAccessLevel } from "../middlewares/authorized.middleware";
import { auditLog } from "../middlewares/audit.middleware";

// Models
import UserModel from "../models/user.model";

// Service
import EmailService from "../service/email.service";
import UserService from "../service/user.service";
import AuditService from "../service/audit.service";

// Utils
import HashUtil from "../utils/hash.util";

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

            const hasEndedShift = await UserService.hasFinishedShiftToday(user.id);

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
                notifSoundEnabled: user.notifSoundEnabled,
                shiftLog,
                hasEndedShift,
            };

            return res.json(userContextPayload);
        },
    ],

    patchPreferences: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("body", UserPreferencesSchema),
        async (req: Request, res: Response) => {
            const requestor = req.user as User;

            const preferences = req.body as unknown as UserPreferencesType;

            const result = await UserModel.updateUser(requestor.id, {
                notifSoundEnabled: preferences.notifSoundEnabled,
            });

            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json(result);
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
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            const user = req.body as User;
            const { email, username } = user;

            if (await UserService.emailExist(email))
                return res.status(409).json({ message: "Email already registered" });

            if (await UserService.usernameExist(username))
                return res.status(409).json({ message: "Username already exists" });

            // Main result following the request
            const result = await UserService.createUser(user);

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    LogAction.USER_CREATED,
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "USER",
                    result.username,
                    result?.fullName ?? ""
                );
            }

            return res.json(result);
        },
    ],

    patch: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        validateSchema("body", UserFormUpdateSchema),
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            // Extract user update specification
            const action = req.params.action as LogAction;

            const userUpdate = req.body as User;

            if (requestor.role === "ADMIN" && userUpdate.role === "SUPERADMIN") {
                return res.status(403).json({ message: "Forbidden: Cannot grant Super Administrator privileges." });
            }

            // Main result following the request
            const result = await UserService.updateUser(userId, userUpdate);

            let remarks;

            if (action == LogAction.USER_PROMOTED || action == LogAction.USER_DEMOTED) {
                remarks = `${user.role} → ${result?.role}`;
            } else if (action == LogAction.USER_ACCOUNT_DISABLED || action == LogAction.USER_ACCOUNT_ENABLED) {
                remarks = "";
            } else {
                remarks = `Updated Fields: [${Object.keys(userUpdate).join(", ")}]`;
            }

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    action,
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "USER",
                    result.username,
                    result?.fullName ?? "",
                    remarks,
                    result.id
                );
            }

            return res.status(201).json(result);
        },
    ],

    delete: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            // Main result following the request
            const result = await UserModel.deleteById(userId);

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    LogAction.USER_DELETED,
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "USER",
                    result.username,
                    result?.fullName ?? ""
                );
            }

            return res.status(204).json(result);
        },
    ],

    resetPassword: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            // Main result following the request
            const result = await UserService.resetPassword(userId, user);

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    LogAction.USER_PASSWORD_RESET,
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "USER",
                    result.username,
                    result?.fullName ?? "",
                    undefined,
                    result.id
                );
            }

            return res.status(204).json(result);
        },
    ],

    changePassword: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("body", UserFormChangePasswordSchema),
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

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

            // Main result following the request
            const result = await UserService.changePassword(user.id, newPassword);

            EmailService.sendPasswordChangeEmail(user.firstName, user.email, user.updatedAt);

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    LogAction.USER_PASSWORD_CHANGE,
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "USER",
                    result.username,
                    result?.fullName ?? "",
                    "Password changed email sent",
                    requestor.id
                );
            }

            return res.status(200).json({ message: "Password Changed Successfully" });
        },
    ],
};
