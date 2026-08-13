// General Imports
import { UpdateUserSchema, UserSchema } from "@qcpesopedro/shared/schema/users";
import type { Request, Response } from "express";

// Middleware
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateUserSchema } from "../middlewares/user.middleware";

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
            console.log(user);
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
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            res.status(200).json(user);
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

            res.status(200).json(users);
        },
    ],

    post: [
        jwtAccessAuth,
        validateUserSchema(UserSchema),
        async (req: Request, res: Response) => {
            const user = req.body as User;
            const { email, username } = user;

            if (await UserService.emailExist(email))
                return res.status(409).json({ message: "Email already registered" });

            if (await UserService.usernameExist(username))
                return res.status(409).json({ message: "Username already exists" });

            const result = UserService.createUser(user);

            res.json(result);
        },
    ],

    patch: [
        jwtAccessAuth,
        validateUserSchema(UpdateUserSchema),
        async (req: Request, res: Response) => {
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const userUpdate = req.body as User;

            UserService.updateUser(userId, userUpdate);

            res.status(201).end();
        },
    ],

    delete: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const userId = Number(req.params.userId);
            const user = await UserService.ensureUserExist(userId);

            if (!user) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            UserModel.deleteById(userId);

            res.status(204).end();
        },
    ],
};
