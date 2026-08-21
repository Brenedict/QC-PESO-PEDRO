// General Imports
import request from "supertest";
import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import prisma from "../../src/config/prisma.config";
import { app, setCurrentAuthUser } from "../../jest.integration";
import { beforeEach, expect, describe, it } from "@jest/globals";

// Router
import userRouter from "../../src/routes/user.route";

// Fixture
import { mockFrontlineUser, mockAdminUser, mockSuperAdminUser } from "../fixtures/user.fixture";

// This only test role-based accessing and does not validate actual requests and responses (i.e. schema request)
describe("User routes - Role Authorization Matrix", () => {
    app.use("/user", userRouter);
    app.use((err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
        console.error("DEBUG INTEGRATION ERROR STACK:", err);
        res.status(500).json({ error: err.toString() });
    });

    beforeEach(async () => {
        await prisma.$transaction([
            prisma.user.deleteMany(),

            prisma.user.createMany({
                data: [mockFrontlineUser, mockAdminUser, mockSuperAdminUser],
            }),
        ]);
    });

    describe("GET user/me (Requires Minimum FRONTLINE Role)", () => {
        // Role permission matrix
        const matrix = [
            { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 200 },
            { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 200 },
            { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 200 },
        ];
        it.each(matrix)("returns $expected status code for $role", async ({ userFixture, expectedStatus }) => {
            //  Tell test auth middleware to authenticate as this user
            setCurrentAuthUser(userFixture);

            // Execute request and verify status code
            const res = await request(app).get("/user/me");

            expect(res.status).toBe(expectedStatus);
        });
    });

    describe("GET user/ (Requires Minimum ADMIN Role)", () => {
        // Role permission matrix
        const matrix = [
            { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
            { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 200 },
            { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 200 },
        ];
        it.each(matrix)("returns $expectedStatus when requested by $role", async ({ userFixture, expectedStatus }) => {
            //  Tell test auth middleware to authenticate as this user
            setCurrentAuthUser(userFixture);

            // Execute request and verify status code
            const res = await request(app).get("/user");

            expect(res.status).toBe(expectedStatus);
        });
    });

    describe("GET user/:id (Requires Minimum ADMIN Role)", () => {
        // Role permission matrix
        const matrix = [
            { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
            { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 200 },
            { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 200 },
        ];
        it.each(matrix)("returns $expectedStatus when requested by $role", async ({ userFixture, expectedStatus }) => {
            //  Tell test auth middleware to authenticate as this user
            setCurrentAuthUser(userFixture);

            // Execute request and verify status code
            const res = await request(app).get(`/user/${userFixture.id}`);

            expect(res.status).toBe(expectedStatus);
        });
    });

    describe("POST user/:userId (Requires Minimum ADMIN Role)", () => {
        // Role permission matrix
        const matrix = [
            { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
            { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 200 },
            { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 200 },
        ];
        it.each(matrix)("returns $expectedStatus when requested by $role", async ({ userFixture, expectedStatus }) => {
            //  Tell test auth middleware to authenticate as this user
            setCurrentAuthUser(userFixture);

            // Execute request and verify status code
            // This is only a sample, validateSchema (middleware) is only a mock here
            const res = await request(app).post("/user").send({
                username: "NULL",
                email: "NULL@gmail.com",
                role: "FRONTLINE",
                status: "ONLINE",
                shift: "MORNING",
                firstName: "NULL",
                lastName: "NULL",
            });

            expect(res.status).toBe(expectedStatus);
        });
    });

    describe("PATCH user/:userId (Requires Minimum ADMIN Role)", () => {
        // Role permission matrix
        const matrix = [
            { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
            { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 201 },
            { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 201 },
        ];
        it.each(matrix)("returns $expectedStatus when requested by $role", async ({ userFixture, expectedStatus }) => {
            //  Tell test auth middleware to authenticate as this user
            setCurrentAuthUser(userFixture);

            // Execute request and verify status code
            // This is only a sample, validateSchema (middleware) is only a mock here
            const res = await request(app).patch(`/user/${userFixture.id}`).send({
                username: "nameChange",
            });

            expect(res.status).toBe(expectedStatus);
        });
    });

    describe("PATCH user/:userId/reset-password (Requires Minimum ADMIN Role)", () => {
        // Role permission matrix
        const matrix = [
            { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
            { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 204 },
            { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 204 },
        ];
        it.each(matrix)("returns $expectedStatus when requested by $role", async ({ userFixture, expectedStatus }) => {
            //  Tell test auth middleware to authenticate as this user
            setCurrentAuthUser(userFixture);

            // Execute request and verify status code
            // This is only a sample, validateSchema (middleware) is only a mock here
            const res = await request(app).patch(`/user/${userFixture.id}/reset-password`);

            expect(res.status).toBe(expectedStatus);
        });
    });

    describe("DELETE user/:userId (Requires Minimum ADMIN Role)", () => {
        // Role permission matrix
        const matrix = [
            { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
            { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 204 },
            { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 204 },
        ];
        it.each(matrix)("returns $expectedStatus when requested by $role", async ({ userFixture, expectedStatus }) => {
            //  Tell test auth middleware to authenticate as this user
            setCurrentAuthUser(userFixture);

            // Execute request and verify status code
            // This is only a sample, validateSchema (middleware) is only a mock here
            const res = await request(app).delete(`/user/${userFixture.id}`);

            expect(res.status).toBe(expectedStatus);
        });
    });
});
