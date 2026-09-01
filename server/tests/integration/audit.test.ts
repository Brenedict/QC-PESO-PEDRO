// General Imports
import request from "supertest";
import prisma from "../../src/config/prisma.config";
import { app, setCurrentAuthUser } from "../../jest.integration";
import { jest, beforeEach, expect, describe, it } from "@jest/globals";

// PEDRO SHARED IMPORTS
import type { AuditLog, User } from "@qcpesopedro/shared/prisma/client";
import AuditModel from "../../src/models/audit.model";
import { mockAdminUser, mockFrontlineUser, mockSuperAdminUser } from "../fixtures/user.fixture";
import { buildMockAuditLog } from "../fixtures/auditLog.fixture";
import auditRoute from "../../src/routes/audit.route";

jest.unmock("../../src/middlewares/authorized.middleware");
jest.unmock("../../src/middlewares/zod.middleware");

describe("Audit Routes", () => {
    app.use("/audit", auditRoute);

    let mockedAuditLogs: AuditLog[];

    beforeEach(async () => {
        await prisma.auditLog.deleteMany();

        mockedAuditLogs = await Promise.all([
            AuditModel.createAuditLog(buildMockAuditLog(1, "TRANSACTION_CREATED", "1001")),
            AuditModel.createAuditLog(buildMockAuditLog(1, "TRANSACTION_EDITED", "1002")),
            AuditModel.createAuditLog(buildMockAuditLog(1, "USER_CREATED", "2001")),
            AuditModel.createAuditLog(buildMockAuditLog(1, "SUBMITTED_END_SHIFT_STATUS", "shift1")),
        ]);
    });

    describe("GET /audit", () => {
        describe("with ADMIN role", () => {
            beforeEach(() => {
                setCurrentAuthUser(mockAdminUser);
            });

            it("returns all audit logs", async () => {
                const res = await request(app).get("/audit").expect(200);

                expect(res.body).toHaveLength(mockedAuditLogs.length);

                const expectedActions = mockedAuditLogs.map((log) => log.actionPerformed);
                res.body.forEach((log: AuditLog & { user: User }) => {
                    expect(log).toMatchObject({
                        id: expect.any(Number),
                        userId: 1,
                        actionPerformed: expect.stringMatching(/^[A-Z_]+$/),
                        affectedRecordId: expect.any(String),
                        changesDetails: expect.any(String),
                        user: {
                            id: expect.any(Number),
                            firstName: expect.any(String),
                            lastName: expect.any(String),
                            role: expect.any(String),
                        },
                    });
                    expect(expectedActions).toContain(log.actionPerformed);
                });
            });

            it("filters by actionPerformed (TRANSACTION type)", async () => {
                const res = await request(app).get("/audit").query({ actionPerformed: "TRANSACTION" }).expect(200);

                expect(res.body).toHaveLength(2);
                res.body.forEach((log: AuditLog & { user: User }) => {
                    expect(log.changesDetails).toMatch(/TRANSACTION/);
                });
            });

            it("filters by actionPerformed (USER type)", async () => {
                const res = await request(app).get("/audit").query({ actionPerformed: "USER" }).expect(200);

                expect(res.body).toHaveLength(1);
                expect(res.body[0].actionPerformed).toBe("USER_CREATED");
            });

            it("filters by actionPerformed (SHIFT type)", async () => {
                const res = await request(app).get("/audit").query({ actionPerformed: "SHIFT" }).expect(200);

                expect(res.body).toHaveLength(1);
                expect(res.body[0].actionPerformed).toBe("SUBMITTED_END_SHIFT_STATUS");
            });

            it("filters by search term in changesDetails", async () => {
                const res = await request(app).get("/audit").query({ search: "TRANSACTION" }).expect(200);

                expect(res.body).toHaveLength(2);
                res.body.forEach((log: AuditLog & { user: User }) => {
                    expect(log.changesDetails).toMatch(/TRANSACTION/);
                });
            });

            it("filters by search term in changesDetails (specific action)", async () => {
                const res = await request(app).get("/audit").query({ search: "TRANSACTION_EDITED" }).expect(200);

                expect(res.body).toHaveLength(1);
                expect(res.body[0].changesDetails).toMatch(/TRANSACTION_EDITED/);
            });

            it("filters by date range", async () => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);

                const res = await request(app)
                    .get("/audit")
                    .query({ startDate: yesterday.toISOString(), endDate: tomorrow.toISOString() })
                    .expect(200);

                expect(res.body).toHaveLength(mockedAuditLogs.length);
            });

            it("returns empty array for date range with no matches", async () => {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 30);

                const res = await request(app)
                    .get("/audit")
                    .query({ startDate: futureDate.toISOString(), endDate: futureDate.toISOString() })
                    .expect(200);

                expect(res.body).toHaveLength(0);
            });

            it("combines filters: actionPerformed and search", async () => {
                const res = await request(app)
                    .get("/audit")
                    .query({ actionPerformed: "TRANSACTION", search: "TRANSACTION_CREATED" })
                    .expect(200);

                expect(res.body.length).toBeGreaterThanOrEqual(1);
                res.body.forEach((log: AuditLog & { user: User }) => {
                    expect(log.changesDetails).toMatch(/TRANSACTION/);
                });
            });
        });

        describe("with FRONTLINE role", () => {
            beforeEach(() => {
                setCurrentAuthUser(mockFrontlineUser);
            });

            it("returns 403 Forbidden", async () => {
                await request(app).get("/audit").expect(403);
            });
        });

        describe("with SUPERADMIN role", () => {
            beforeEach(() => {
                setCurrentAuthUser(mockSuperAdminUser);
            });

            it("returns all audit logs", async () => {
                const res = await request(app).get("/audit").expect(200);
                expect(res.body).toHaveLength(mockedAuditLogs.length);
            });
        });
    });

    describe("Error handling", () => {
        it("returns 404 when user is missing", async () => {
            setCurrentAuthUser(undefined as unknown as User);
            await request(app).get("/audit").expect(404);
        });

        it("returns 400 when startDate is after endDate", async () => {
            setCurrentAuthUser(mockAdminUser);

            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 30);
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 30);

            await request(app)
                .get("/audit")
                .query({ startDate: futureDate.toISOString(), endDate: pastDate.toISOString() })
                .expect(400);
        });
    });
});
