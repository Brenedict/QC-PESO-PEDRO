import request from "supertest";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../../src/routes/auth.route";
import type { User } from "../../generated/prisma/client";

import { describe, expect, jest, test } from "@jest/globals";

const mockUser: User = {
    id: 1,
    username: "john",
    email: "johndoe@gmail.com",
    password: "password123",
} as User;

jest.mock("../../src/middlewares/passport.middleware", () => ({
    localAuth: (req: express.Request, _res: express.Response, next: express.NextFunction) => {
        req.user = mockUser;
        next();
    },
    jwtRefreshAuth: (req: express.Request, _res: express.Response, next: express.NextFunction) => {
        req.user = mockUser;
        next();
    },
    jwtAccessAuth: (req: express.Request, _res: express.Response, next: express.NextFunction) => {
        req.user = mockUser;
        next();
    },
}));

jest.mock("../../src/config/env.config", () => ({
    NODE_ENV: "test",
    JWT_ACCESS_SECRET: "access-secret",
    JWT_REFRESH_SECRET: "refresh-secret",
    JWT_ACCESS_EXPIRES_IN: "15m",
    JWT_REFRESH_EXPIRES_IN: "7d",
}));

function createTestApp() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use("/auth", authRouter);
    return app;
}

describe("Auth routes – integration tests", () => {
    const app = createTestApp();

    test("POST /auth/login returns access token & sets refresh cookie", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: "johndoe@gmail.com", password: "password123" })
            .expect(200)
            .expect("Content-Type", /json/);

        // Check if access token is in body
        expect(res.body).toHaveProperty("accessToken");
        expect(typeof res.body.accessToken).toBe("string");

        // and the refresh token must be present as an HttpOnly cookie
        expect(res.headers["set-cookie"]?.[0]).toMatch(/^refreshToken=/);
        expect(res.headers["set-cookie"]?.[0]).toContain("HttpOnly");
    });

    test("POST /auth/refresh returns new access token & refresh cookie", async () => {
        const res = await request(app)
            .post("/auth/refresh")
            .set("Cookie", "refreshToken=dummy")
            .expect(200)
            .expect("Content-Type", /json/);

        expect(res.body).toHaveProperty("accessToken");
        expect(res.headers["set-cookie"]?.[0]).toMatch(/^refreshToken=/);
        expect(res.headers["set-cookie"]?.[0]).toContain("HttpOnly");
    });

    test("POST /auth/logout clears the refresh cookie", async () => {
        const res = await request(app).post("/auth/logout").expect(200).expect("Content-Type", /json/);
        expect(res.headers["set-cookie"]?.[0]).toMatch(/^refreshToken=;/); //Empty refresh token
    });

    test("GET /protected passes when auth middleware is mocked", async () => {
        const res = await request(app).get("/auth/protected").expect(200).expect("Content-Type", /json/);
        expect(res.body).toEqual({ message: "Authentication passed" });
    });
});
