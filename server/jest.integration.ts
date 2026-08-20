import prisma from "./src/config/prisma.config";
import "./src/config/passport.config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { mockAdminUser } from "./tests/fixtures/user.fixture";
import type { User } from "@qcpesopedro/shared/prisma/client";

let mockCurrentAuthUser: User = mockAdminUser;

export function setCurrentAuthUser(user: User) {
    mockCurrentAuthUser = user;
}

jest.mock("./src/middlewares/passport.middleware", () => ({
    localAuth(req: Request, _res: Response, next: NextFunction) {
        req.user = mockCurrentAuthUser;
        next();
    },
    jwtAccessAuth(req: Request, _res: Response, next: NextFunction) {
        req.user = mockCurrentAuthUser;
        next();
    },
    jwtRefreshAuth(req: Request, _res: Response, next: NextFunction) {
        req.user = mockCurrentAuthUser;
        next();
    },
}));

jest.mock("./src/middlewares/zod.middleware", () => ({
    validateSchema: () => (_req: Request, _res: Response, next: NextFunction) => {
        next();
    },
}));

beforeEach(async () => {
    mockCurrentAuthUser = mockAdminUser;
    await prisma.$transaction([prisma.user.deleteMany()]);
});

afterAll(async () => {
    await prisma.$disconnect();
});

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
