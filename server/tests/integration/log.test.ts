// General Imports
import request from "supertest";
import prisma from "../../src/config/prisma.config";
import { app, setCurrentAuthUser } from "../../jest.integration";
import { jest, beforeEach, afterAll, expect, describe, it } from "@jest/globals";

// Router
import logRouter from "../../src/routes/log.route";

// Fixture
import { mockAdminUser, mockFrontlineUser, mockSuperAdminUser } from "../fixtures/user.fixture";
import { buildMockAccountLog, buildMockAccountLogs, buildMockOpenAccountLog } from "../fixtures/accountLog.fixture";

// Use actual role validator
jest.unmock("../../src/middlewares/authorized.middleware");
jest.unmock("../../src/middlewares/zod.middleware");

describe("Log Routes", () => {
    app.use("/log", logRouter);

    beforeEach(async () => {
        await prisma.$transaction([
            prisma.transaction.deleteMany(),
            prisma.accountLog.deleteMany(),
            prisma.user.deleteMany(),
            prisma.user.createMany({
                data: [mockFrontlineUser, mockAdminUser, mockSuperAdminUser],
            }),
        ]);
    });

    describe("GET /log/", () => {
        it("returns overview with zero counts when no account logs exist", async () => {
            setCurrentAuthUser(mockAdminUser);

            const res = await request(app).get("/log/").expect(200);

            expect(res.body).toHaveProperty("currentlyLogged");
            expect(res.body).toHaveProperty("totalLogIn");
            expect(res.body).toHaveProperty("totalLogOut");
            expect(res.body).toHaveProperty("avgSession");
            expect(res.body).toHaveProperty("accountLogs");
            expect(res.body.currentlyLogged).toBe(0);
            expect(res.body.totalLogIn).toBe(0);
            expect(res.body.totalLogOut).toBe(0);
        });

        it("returns correct counts when account logs exist", async () => {
            setCurrentAuthUser(mockAdminUser);

            // Create an open log (currently logged in)
            await prisma.accountLog.create({
                data: {
                    userId: mockFrontlineUser.id,
                    logIn: new Date("2026-08-31T09:00:00.000Z"),
                    logOut: null,
                },
            });

            // Create a closed log
            await prisma.accountLog.create({
                data: {
                    userId: mockFrontlineUser.id,
                    logIn: new Date("2026-08-31T08:00:00.000Z"),
                    logOut: new Date("2026-08-31T17:00:00.000Z"),
                    reason: "End of shift",
                },
            });

            const res = await request(app).get("/log/").expect(200);

            expect(res.body.currentlyLogged).toBe(1);
            expect(res.body.totalLogIn).toBe(2);
            expect(res.body.totalLogOut).toBe(1);
        });

        it("returns account logs for each user", async () => {
            setCurrentAuthUser(mockAdminUser);

            // Create multiple logs for frontline user
            for (const log of buildMockAccountLogs(mockFrontlineUser.id)) {
                await prisma.accountLog.create({ data: log });
            }

            const res = await request(app).get("/log/").expect(200);

            expect(Array.isArray(res.body.accountLogs)).toBe(true);
            expect(res.body.accountLogs.length).toBeGreaterThan(0);
        });

        it("excludes logs outside the date range", async () => {
            setCurrentAuthUser(mockAdminUser);

            // Log from a past date
            await prisma.accountLog.create({
                data: {
                    userId: mockFrontlineUser.id,
                    logIn: new Date("2026-07-01T09:00:00.000Z"),
                    logOut: new Date("2026-07-01T17:00:00.000Z"),
                },
            });

            // Log within today (2026-08-31)
            await prisma.accountLog.create({
                data: {
                    userId: mockFrontlineUser.id,
                    logIn: new Date("2026-08-31T09:00:00.000Z"),
                    logOut: new Date("2026-08-31T17:00:00.000Z"),
                },
            });

            const res = await request(app)
                .get("/log/")
                .query({ startDate: "2026-08-31T00:00:00.000Z", endDate: "2026-08-31T23:59:59.999Z" })
                .expect(200);

            expect(res.body.totalLogIn).toBe(1);
            expect(res.body.totalLogOut).toBe(1);
        });

        it("filters account logs by role", async () => {
            setCurrentAuthUser(mockAdminUser);

            // Create logs for frontline and admin
            await prisma.accountLog.create({
                data: { userId: mockFrontlineUser.id, logIn: new Date(), logOut: new Date() },
            });
            await prisma.accountLog.create({
                data: { userId: mockAdminUser.id, logIn: new Date(), logOut: new Date() },
            });

            const res = await request(app).get("/log/").query({ role: "FRONTLINE" }).expect(200);

            expect(res.body.accountLogs.length).toBeGreaterThanOrEqual(1);
            for (const log of res.body.accountLogs) {
                expect(log.role).toBe("FRONTLINE");
            }
        });
    });

    describe("GET /log/:userId", () => {
        it("returns 404 for an invalid user id format", async () => {
            setCurrentAuthUser(mockAdminUser);

            await request(app).get("/log/invalid").expect(404);
        });

        it("returns user fullName and empty accountLogs when user has no logs", async () => {
            setCurrentAuthUser(mockAdminUser);

            const res = await request(app).get(`/log/${mockFrontlineUser.id}`).expect(200);

            expect(res.body.user).toBe(mockFrontlineUser.firstName + " " + mockFrontlineUser.lastName);
            expect(Array.isArray(res.body.accountLogs)).toBe(true);
            expect(res.body.accountLogs.length).toBe(0);
        });

        it("returns all logout logs for a user with session duration", async () => {
            setCurrentAuthUser(mockAdminUser);

            // Create multiple closed logs for the user
            for (const log of buildMockAccountLogs(mockFrontlineUser.id)) {
                await prisma.accountLog.create({ data: log });
            }

            const res = await request(app).get(`/log/${mockFrontlineUser.id}`).expect(200);

            expect(res.body.user).toBe(mockFrontlineUser.firstName + " " + mockFrontlineUser.lastName);
            expect(Array.isArray(res.body.accountLogs)).toBe(true);
            expect(res.body.accountLogs.length).toBe(buildMockAccountLogs(mockFrontlineUser.id).length);

            // Each log should have sessionDuration
            for (const log of res.body.accountLogs) {
                expect(log).toHaveProperty("sessionDuration");
                expect(log.logOut).not.toBeNull();
            }
        });

        it("excludes open logs (no logOut) from the user history", async () => {
            setCurrentAuthUser(mockAdminUser);

            // Create an open log (should be excluded)
            await prisma.accountLog.create({
                data: buildMockOpenAccountLog(mockFrontlineUser.id),
            });

            // Create a closed log (should be included)
            await prisma.accountLog.create({
                data: buildMockAccountLog(mockFrontlineUser.id),
            });

            const res = await request(app).get(`/log/${mockFrontlineUser.id}`).expect(200);

            // Should only return the closed log
            expect(res.body.accountLogs.length).toBe(1);
            expect(res.body.accountLogs[0].logOut).not.toBeNull();
        });

        it("returns logs ordered by logIn ascending", async () => {
            setCurrentAuthUser(mockAdminUser);

            const logs = buildMockAccountLogs(mockFrontlineUser.id);
            for (const log of logs) {
                await prisma.accountLog.create({ data: log });
            }

            const res = await request(app).get(`/log/${mockFrontlineUser.id}`).expect(200);

            const logInDates = res.body.accountLogs.map((log: { logIn: string }) => new Date(log.logIn).getTime());
            const sortedDates = [...logInDates].sort((a, b) => a - b);
            expect(logInDates).toEqual(sortedDates);
        });
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
