import prisma from "./src/config/prisma.config";
import "./src/config/passport.config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { mockUser } from "./tests/fixtures/user.fixture";

jest.mock("./src/middlewares/passport.middleware", () => ({
    localAuth(req: Request, _res: Response, next: NextFunction) {
        req.user = mockUser;
        next();
    },
    jwtAccessAuth(req: Request, _res: Response, next: NextFunction) {
        req.user = mockUser;
        next();
    },
    jwtRefreshAuth(req: Request, _res: Response, next: NextFunction) {
        req.user = mockUser;
        next();
    },
}));

beforeEach(async () => {
    await prisma.$transaction([
        prisma.transaction.deleteMany(),
        prisma.shiftLog.deleteMany(),
        prisma.user.deleteMany(),
    ]);
});

afterAll(async () => {
    await prisma.$disconnect();
});

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
