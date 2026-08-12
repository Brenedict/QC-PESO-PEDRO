import request from "supertest";
import express from "express";
import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import authRouter from "../../src/routes/auth.route";
import type { User } from "../../generated/prisma/browser";
import prisma from "../../src/config/prisma.config";

export const mockUser: User = {
    id: 1,
    username: "john",
    email: "johndoe@gmail.com",
    password: "password123",
    role: "ADMIN",
    status: "ONLINE",
    shift: "MORNING",
    firstName: "John",
    lastName: "Doe",
    createdAt: new Date(),
    updatedAt: new Date(),
};

function createTestApp() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use("/auth", authRouter);
    app.use((err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
        console.error("DEBUG INTEGRATION ERROR STACK:", err);
        res.status(500).json({ error: err.toString() });
    });
    return app;
}

describe("auth routes", () => {
    beforeEach(async () => {
        await prisma.$transaction([prisma.user.deleteMany(), prisma.user.create({ data: mockUser })]);
    });

    const app = createTestApp();

    describe("POST /auth/login", () => {
        it("returns access token & sets refresh cookie", async () => {
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

        it("returns status 401 on incorrect email", (done) => {
            request(app)
                .post("/auth/login")
                .send({ email: "janedoe@gmail.com", password: "password123" })
                .expect(401, done);
        });

        it("returns status 401 on incorrect password", (done) => {
            request(app)
                .post("/auth/login")
                .send({ email: "johndoe@gmail.com", password: "passworddddd" })
                .expect(401, done);
        });
    });

    describe("POST /auth/refresh", () => {
        it("returns new access token & refresh cookie", async () => {
            // Log in first to get a real refresh cookie
            const loginRes = await request(app)
                .post("/auth/login")
                .send({ email: "johndoe@gmail.com", password: "password123" })
                .expect(200);

            const refreshCookie = loginRes.headers["set-cookie"]?.[0];
            expect(refreshCookie).toBeDefined();

            const res = await request(app)
                .post("/auth/refresh")
                .set("Cookie", refreshCookie as string)
                .expect(200)
                .expect("Content-Type", /json/);

            expect(res.body).toHaveProperty("accessToken");
            expect(res.headers["set-cookie"]?.[0]).toMatch(/^refreshToken=/);
            expect(res.headers["set-cookie"]?.[0]).toContain("HttpOnly");
        });

        it("returns status 401 when we dont have refresh cookie", (done) => {
            request(app).post("/auth/refresh").expect(401, done);
        });
    });

    describe("POST /auth/logout", () => {
        it("clears the refresh cookie", async () => {
            const loginRes = await request(app)
                .post("/auth/login")
                .send({ email: "johndoe@gmail.com", password: "password123" })
                .expect(200);

            const refreshCookie = loginRes.headers["set-cookie"]?.[0];

            const res = await request(app)
                .post("/auth/logout")
                .set("Cookie", refreshCookie as string)
                .expect(200)
                .expect("Content-Type", /json/);

            expect(res.headers["set-cookie"]?.[0]).toMatch(/^refreshToken=;/); //Empty refresh token
        });
    });

    describe("GET /auth/protected", () => {
        it("accepts user when theres access token", async () => {
            const loginRes = await request(app)
                .post("/auth/login")
                .send({ email: "johndoe@gmail.com", password: "password123" })
                .expect(200);

            const accessToken = loginRes.body.accessToken;

            const res = await request(app)
                .get("/auth/protected")
                .set("Authorization", `Bearer ${accessToken}`)
                .expect(200)
                .expect("Content-Type", /json/);

            expect(res.body).toEqual({ message: "Authentication passed" });
        });

        it("returns status 401 when we dont have access token", (done) => {
            request(app).get("/auth/protected").expect(401, done);
        });
    });
});
