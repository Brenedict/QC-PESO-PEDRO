// General Imports
import { UserFormCreateSchema, UserFormUpdateSchema } from "@qcpesopedro/shared/schema/users";
import type { Request, Response } from "express";

// Middleware
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateSchema } from "../middlewares/zod.middleware";

// Prisma Types
import type { Role, Status, User } from "@qcpesopedro/shared/prisma/client";

// Models
import UserModel from "../models/user.model";

// Service
import UserService from "../service/user.service";

export default {
    getCurrentUser: [
        jwtAccessAuth,
        (req: Request, res: Response) => {
            const user = req.user as User;

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const userContextPayload = {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                status: user.status,
                firstName: user.firstName,
                lastName: user.lastName,
            };

            return res.json(userContextPayload);
        },
    ],

    getUserById: [
        jwtAccessAuth,
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
        async (req: Request, res: Response) => {
            // Collects queries from URL
            const role = req.query.role as Role;
            const status = req.query.status as Status;

            // Retrieves users with optional filters
            const users = await UserService.getUsers({ role, status });

            return res.status(200).json(users);
        },
    ],

    createUser: [
        jwtAccessAuth,
        validateSchema(UserFormCreateSchema),
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
        validateSchema(UserFormUpdateSchema),
        async (req: Request, res: Response) => {
            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const requestor = req.user as User;

            if (requestor.role === "ADMIN" && user.role !== "FRONTLINE") {
                return res
                    .status(403)
                    .json({ message: "Forbidden: Administrators can only modify Frontline Encoders." });
            }

            const userUpdate = req.body as User;

            if (requestor.role === "ADMIN" && userUpdate.role === "SUPERADMIN") {
                return res.status(403).json({ message: "Forbidden: Cannot grant Super Administrator privileges." });
            }

            const result = await UserService.updateUser(userId, userUpdate);

            return res.status(201).send();
        },
    ],

    delete: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const result = await UserModel.deleteById(userId);

            return res.status(204).send();
        },
    ],

    resetPassword: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            // Default user check
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const requestor = req.user as User;

            if (requestor.role === "ADMIN" && user.role !== "FRONTLINE") {
                return res
                    .status(403)
                    .json({ message: "Forbidden: Administrators can only reset passwords for Frontline Encoders." });
            }

            const result = await UserService.resetPassword(userId, user);
            console.log("REACHED");

            return res.status(204).send();
        },
    ],
};
