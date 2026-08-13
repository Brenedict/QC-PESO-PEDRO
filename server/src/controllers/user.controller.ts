import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import type { User } from "@qcpesopedro/shared/prisma/client";
import UserModel from "../models/user.model";
import { validateSchema } from "../middlewares/zod.middleware";
import { UpdateUserSchema, UserSchema } from "@qcpesopedro/shared/schema/users";
import UserService from "../service/user.service";
import type { Role, Status } from "@qcpesopedro/shared/prisma/client";

export default {
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
        validateSchema(UserSchema),
        async (req: Request, res: Response) => {
            const user = req.body as User;
            const { email, username } = user;

            if (await UserService.emailExist(email))
                return res.status(409).json({ message: "Email already registered" });

            if (await UserService.usernameExist(username))
                return res.status(409).json({ message: "Username already exists" });

            const result = UserModel.createUser(user);

            res.json(result);
        },
    ],

    patch: [
        jwtAccessAuth,
        validateSchema(UpdateUserSchema),
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
