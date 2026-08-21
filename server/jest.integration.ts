// General Imports
import express from "express";
import type { Request, Response, NextFunction } from "express";
import prisma from "./src/config/prisma.config";
import "./src/config/passport.config";
import cookieParser from "cookie-parser";
import { jest, beforeEach, afterAll } from "@jest/globals";

// PEDRO SHARED IMPORTS
import type { User } from "@qcpesopedro/shared/prisma/client";

// Fixtures
import { mockUser } from "./tests/fixtures/user.fixture";

let mockCurrentAuthUser: User = mockUser;

export function setCurrentAuthUser(user: User) {
    mockCurrentAuthUser = user;
}

// Single mock for passport middleware
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
    // 1. Reset current mock user state
    mockCurrentAuthUser = mockUser;

    // 2. Clear tables in correct relation order
    await prisma.$transaction([
        prisma.transaction.deleteMany(),
        prisma.shiftLog.deleteMany(),
        prisma.user.deleteMany(),
    ]);

    // 3. Re-create the mock auth user in DB so foreign keys work!
    await prisma.user.create({
        data: mockUser,
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
