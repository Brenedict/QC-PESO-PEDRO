// General Imports
import request from "supertest";
import prisma from "../../src/config/prisma.config";
import { app, setCurrentAuthUser } from "../../jest.integration";
import { jest, beforeEach, expect, describe, it } from "@jest/globals";

// Router
import userRouter from "../../src/routes/user.route";
import transactionRouter from "../../src/routes/transaction.route";

// Fixture
import { mockFrontlineUser, mockAdminUser, mockSuperAdminUser } from "../fixtures/user.fixture";

import { type ShiftLog, type User } from "@qcpesopedro/shared/prisma/client";
import {
    TransactionAnalyticsQueryInput,
    TransactionCreateType,
    TransactionUpdateType,
} from "@qcpesopedro/shared/schema/transactions";

// Fixtures
import { buildMockShiftLog } from "../fixtures/shiftLog.fixture";
import TransactionService from "../../src/service/transaction.service";
import { buildMockTransaction } from "../fixtures/transaction.fixture";

// Use actual role validator
jest.unmock("../../src/middlewares/authorized.middleware");

// This only test role-based accessing and does not validate actual requests and responses (i.e. schema request)
describe("Server Routes - Role Authorization Matrix", () => {
    // Rinemove ko yung err 500 handler, meron na siya sa error.middleware.ts
    app.use("/user", userRouter);
    app.use("/transaction", transactionRouter);

    describe("User routes /user", () => {
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

            it.each(matrix)(
                "returns $expectedStatus when requested by $role",
                async ({ userFixture, expectedStatus }) => {
                    //  Tell test auth middleware to authenticate as this user
                    setCurrentAuthUser(userFixture);

                    // Execute request and verify status code
                    const res = await request(app).get("/user");

                    expect(res.status).toBe(expectedStatus);
                }
            );
        });

        describe("GET user/:id (Requires Minimum ADMIN Role)", () => {
            // Role permission matrix
            const matrix = [
                { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
                { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 200 },
                { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 200 },
            ];

            it.each(matrix)(
                "returns $expectedStatus when requested by $role",
                async ({ userFixture, expectedStatus }) => {
                    //  Tell test auth middleware to authenticate as this user
                    setCurrentAuthUser(userFixture);

                    // Execute request and verify status code
                    const res = await request(app).get(`/user/${userFixture.id}`);

                    expect(res.status).toBe(expectedStatus);
                }
            );
        });

        describe("POST user/:userId (Requires Minimum ADMIN Role)", () => {
            // Role permission matrix
            const matrix = [
                { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
                { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 200 },
                { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 200 },
            ];

            it.each(matrix)(
                "returns $expectedStatus when requested by $role",
                async ({ userFixture, expectedStatus }) => {
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
                }
            );
        });

        describe("PATCH user/:userId (Requires Minimum ADMIN Role)", () => {
            // Role permission matrix
            const matrix = [
                { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
                { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 201 },
                { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 201 },
            ];

            it.each(matrix)(
                "returns $expectedStatus when requested by $role",
                async ({ userFixture, expectedStatus }) => {
                    //  Tell test auth middleware to authenticate as this user
                    setCurrentAuthUser(userFixture);

                    // Execute request and verify status code
                    // This is only a sample, validateSchema (middleware) is only a mock here
                    const res = await request(app).patch(`/user/${userFixture.id}`).send({
                        username: "nameChange",
                    });

                    expect(res.status).toBe(expectedStatus);
                }
            );
        });

        describe("PATCH user/:userId/reset-password (Requires Minimum ADMIN Role)", () => {
            // Role permission matrix
            const matrix = [
                { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
                { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 204 },
                { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 204 },
            ];

            it.each(matrix)(
                "returns $expectedStatus when requested by $role",
                async ({ userFixture, expectedStatus }) => {
                    //  Tell test auth middleware to authenticate as this user
                    setCurrentAuthUser(userFixture);

                    // Execute request and verify status code
                    // This is only a sample, validateSchema (middleware) is only a mock here
                    const res = await request(app).patch(`/user/${userFixture.id}/reset-password`);

                    expect(res.status).toBe(expectedStatus);
                }
            );
        });

        describe("DELETE user/:userId (Requires Minimum ADMIN Role)", () => {
            // Role permission matrix
            const matrix = [
                { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 403 },
                { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 204 },
                { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 204 },
            ];

            it.each(matrix)(
                "returns $expectedStatus when requested by $role",
                async ({ userFixture, expectedStatus }) => {
                    //  Tell test auth middleware to authenticate as this user
                    setCurrentAuthUser(userFixture);

                    // Execute request and verify status code
                    // This is only a sample, validateSchema (middleware) is only a mock here
                    const res = await request(app).delete(`/user/${userFixture.id}`);

                    expect(res.status).toBe(expectedStatus);
                }
            );
        });
    });

    describe("Transaction routes /transaction", () => {
        let mockedTransactionId: number;
        let mockedTransaction: TransactionCreateType;
        let mockedUser: User;
        let mockedShiftLog: ShiftLog;

        beforeEach(async () => {
            // Query the active user guaranteed to exist by global setup
            mockedUser = await prisma.user.findFirstOrThrow();
            mockedShiftLog = await prisma.shiftLog.create({ data: buildMockShiftLog(mockedUser.id) });

            // Used to temporarily retrieved Transaction Id
            const temp = buildMockTransaction(mockedUser.id, mockedShiftLog.id);

            mockedTransactionId = temp.id;
            mockedTransaction = temp;
            await TransactionService.createTransactionWithCode(mockedTransaction);
        });

        describe("GET transaction/ (Requires Minimum FRONTLINE Role)", () => {
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
                const res = await request(app).get("/transaction");

                expect(res.status).toBe(expectedStatus);
            });
        });

        describe("GET transaction/:transactionId (Requires Minimum FRONTLINE Role)", () => {
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
                const res = await request(app).get(`/transaction/${mockedTransactionId}`);

                expect(res.status).toBe(expectedStatus);
            });
        });

        describe("POST transaction/analytics (Requires Minimum FRONTLINE Role)", () => {
            // Role permission matrix
            const matrix = [
                { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 200 },
                { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 200 },
                { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 200 },
            ];

            const payload: TransactionAnalyticsQueryInput = {
                queries: [
                    {
                        type: "DATE_RANGE",
                        id: "successfulBySex",
                        groupBy: "applicantSex",
                        filters: {
                            outcome: "SUCCESS",
                        },
                    },
                    {
                        type: "BREAKDOWN",
                        id: "successfulDaily",
                        startDate: "2026-08-01T00:00:00.000Z",
                        endDate: "2026-08-31T23:59:59.999Z",
                        breakdown: "DAILY",
                        filters: {
                            outcome: "SUCCESS",
                        },
                    },
                ],
            };

            it.each(matrix)("returns $expected status code for $role", async ({ userFixture, expectedStatus }) => {
                //  Tell test auth middleware to authenticate as this user
                setCurrentAuthUser(userFixture);

                // Execute request and verify status code
                const res = await request(app).post(`/transaction/analytics`).send(payload);

                expect(res.status).toBe(expectedStatus);
            });
        });

        describe("POST transaction/ (Requires Minimum FRONTLINE Role)", () => {
            // Role permission matrix
            const matrix = [
                { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 201 },
                { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 201 },
                { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 201 },
            ];

            it.each(matrix)("returns $expected status code for $role", async ({ userFixture, expectedStatus }) => {
                // Form Data inside `it.each` so that it reloads every `beforeEach`
                const formData: TransactionCreateType = {
                    applicantFirstName: "John",
                    applicantLastName: "Doe",
                    transactionType: "IN_HOUSE_RECRUITMENT",
                    shiftLogId: mockedShiftLog.id,
                    userId: mockedUser.id,
                    transactionOutcome: "PENDING",
                    applicantSex: "MALE",
                    demographics: ["FIRST_TIME_JOB_SEEKER"],
                };

                //  Tell test auth middleware to authenticate as this user
                setCurrentAuthUser(userFixture);

                // Execute request and verify status code
                const res = await request(app).post(`/transaction`).send(formData);

                expect(res.status).toBe(expectedStatus);
            });
        });

        describe("Patch transaction/:transactionId (Requires Minimum FRONTLINE Role)", () => {
            // Role permission matrix
            const matrix = [
                { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 200 },
                { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 200 },
                { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 200 },
            ];

            it.each(matrix)("returns $expected status code for $role", async ({ userFixture, expectedStatus }) => {
                // Form Data inside `it.each` so that it reloads every `beforeEach`
                const formData: TransactionUpdateType = {
                    applicantFirstName: "NULL",
                };

                //  Tell test auth middleware to authenticate as this user
                setCurrentAuthUser(userFixture);

                // Execute request and verify status code
                const res = await request(app).patch(`/transaction/${mockedTransactionId}`).send(formData);

                expect(res.status).toBe(expectedStatus);
            });
        });

        describe("Delete transaction/:transactionId (Requires Minimum FRONTLINE Role)", () => {
            // Role permission matrix
            const matrix = [
                { role: "FRONLINE", userFixture: mockFrontlineUser, expectedStatus: 204 },
                { role: "ADMIN", userFixture: mockAdminUser, expectedStatus: 204 },
                { role: "SUPERADMIN", userFixture: mockSuperAdminUser, expectedStatus: 204 },
            ];

            it.each(matrix)("returns $expected status code for $role", async ({ userFixture, expectedStatus }) => {
                //  Tell test auth middleware to authenticate as this user
                setCurrentAuthUser(userFixture);

                // Execute request and verify status code
                const res = await request(app).delete(`/transaction/${mockedTransactionId}`);

                expect(res.status).toBe(expectedStatus);
            });
        });
    });
});
