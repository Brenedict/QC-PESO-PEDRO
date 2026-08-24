// General Imports
import request from "supertest";
import { app } from "../../jest.integration";
import { jest, beforeEach, expect, describe, it } from "@jest/globals";
import ShiftModel from "../../src/models/shift.model";

// PEDRO SHARED IMPORTS
import type { TransactionUncheckedUpdateInput } from "@qcpesopedro/shared/prisma/models";
import {
    Outcome,
    TransactionType,
    type Transaction,
    type ShiftLog,
    type User,
} from "@qcpesopedro/shared/prisma/client";
import {
    TransactionAnalyticsQueryInput,
    TransactionCreateType,
    TransactionQueryInput,
    TransactionQueryType,
    TransactionUpdateType,
} from "@qcpesopedro/shared/schema/transactions";

// Router
import transactionRoute from "../../src/routes/transaction.route";

// Fixtures
import prisma from "../../src/config/prisma.config";
import { mockUser, UserCreate } from "../fixtures/user.fixture";
import { buildMockShiftLog } from "../fixtures/shiftLog.fixture";
import TransactionService from "../../src/service/transaction.service";
import {
    buildMockTransactions,
    getExpectedBreakdown,
    getExpectedGrouped,
    getExpectedGroupedBreakdown,
    getTransactionsInRange,
} from "../fixtures/transaction.fixture";
import { TOMORROW, YESTERDAY } from "../../src/utils/date.util";

// Use actual schema validator
jest.unmock("../../src/middlewares/zod.middleware");

const transformMockedDate = (transaction: TransactionCreateType): TransactionCreateType => {
    const newTransaction = { ...transaction };
    if (newTransaction.createdAt) newTransaction.createdAt = expect.any(String) as unknown as Date;
    if (newTransaction.updatedAt) newTransaction.updatedAt = expect.any(String) as unknown as Date;
    return newTransaction;
};

describe("Transaction Route", () => {
    let mockedTransactions: Transaction[];
    const mockedUser: UserCreate = mockUser;
    let mockedShiftLog: ShiftLog;

    beforeEach(async () => {
        mockedShiftLog = await ShiftModel.createShift({ data: buildMockShiftLog(mockedUser.id) });

        const mockData = buildMockTransactions(mockedUser.id, mockedShiftLog.id);
        mockedTransactions = await TransactionService.createTransactionsWithCode(mockData);
    });

    app.use("/transaction", transactionRoute);

    describe("GET /transaction", () => {
        it("returns all transactions", async () => {
            const res = await request(app)
                .get("/transaction")
                .query({ shiftLogId: mockedShiftLog.id } as TransactionQueryInput)
                .expect(200);
            const transactions = res.body.transactions;

            expect(res.body).not.toHaveProperty("originalSize");
            expect(res.body).toHaveProperty("responseSize", transactions.length);

            const expectedOrder = [...mockedTransactions].sort(
                (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
            );

            transactions.forEach((transaction: Transaction, i: number) =>
                expect(transaction).toMatchObject({
                    ...transformMockedDate(expectedOrder[i]),
                    txCode: expect.stringMatching(/^TX-\d+-\d+$/),
                })
            );
        });

        it("returns transactions with included user", async () => {
            const res = await request(app)
                .get("/transaction?include=user")
                .query({ shiftLogId: mockedShiftLog.id } as TransactionQueryInput)
                .expect(200);
            const transactions = res.body.transactions;

            expect(res.body).toHaveProperty("responseSize", transactions.length);

            transactions.forEach((transaction: Transaction & { user?: { id: number } }) => {
                expect(transaction).toHaveProperty("user");
                expect(transaction.user).toMatchObject({
                    id: transaction.userId,
                });
                expect(transaction).not.toHaveProperty("shiftLog");
            });
        });

        describe("with filters", () => {
            it("returns transactions with type filter", async () => {
                const res = await request(app)
                    .get(`/transaction`)
                    .query({
                        shiftLogId: mockedShiftLog.id,
                        type: TransactionType.WALK_IN_REFERRAL,
                    } as TransactionQueryType)
                    .expect(200);

                expect(res.body).not.toHaveProperty("originalSize");
                expect(res.body).toHaveProperty("responseSize", res.body.transactions.length);

                res.body.transactions.forEach((transaction: Transaction) => {
                    expect(transaction).toHaveProperty("transactionType", TransactionType.WALK_IN_REFERRAL);
                });
            });

            it("returns transactions with outcome filter", async () => {
                const res = await request(app)
                    .get(`/transaction`)
                    .query({ shiftLogId: mockedShiftLog.id, outcome: Outcome.PENDING } as TransactionQueryType);

                res.body.transactions.forEach((transaction: Transaction) => {
                    expect(transaction).toHaveProperty("transactionOutcome", Outcome.PENDING);
                });
            });

            it("returns transactions with both type and outcome filter", async () => {
                const res = await request(app)
                    .get(`/transaction`)
                    .query({
                        shiftLogId: mockedShiftLog.id,
                        outcome: Outcome.PENDING,
                        type: TransactionType.WALK_IN_REFERRAL,
                    } as TransactionQueryType);

                res.body.transactions.forEach((transaction: Transaction) => {
                    expect(transaction).toHaveProperty("transactionOutcome", TransactionType.WALK_IN_REFERRAL);
                    expect(transaction).toHaveProperty("transactionOutcome", Outcome.PENDING);
                });
            });

            it("returns transactions with search filter for name", async () => {
                const res = await request(app)
                    .get("/transaction")
                    .query({ shiftLogId: mockedShiftLog.id, search: "john doe" } as TransactionQueryType)
                    .expect(200);

                expect(res.body.transactions).toEqual(
                    expect.arrayContaining([expect.objectContaining(transformMockedDate(mockedTransactions[0]))])
                );

                const nonSearched = mockedTransactions.slice(1);
                expect(res.body.transactions).not.toEqual(
                    expect.arrayContaining(nonSearched.map((transaction) => expect.objectContaining(transaction)))
                );
            });

            it("returns transactions with search filter for id", async () => {
                const searchRes = await request(app)
                    .get("/transaction/3")
                    .query({ shiftLogId: mockedShiftLog.id })
                    .expect(200);

                const txCode = searchRes.body.transaction.txCode as string;

                const res = await request(app)
                    .get("/transaction")
                    .query({ shiftLogId: mockedShiftLog.id, search: txCode.toLowerCase() } as TransactionQueryType)
                    .expect(200);

                expect(res.body.transactions).toEqual(
                    expect.arrayContaining([expect.objectContaining(transformMockedDate(mockedTransactions[2]))])
                );

                const nonSearched = mockedTransactions.slice(0, 2);
                nonSearched.map((transaction) => expect.objectContaining(transformMockedDate(transaction)));
            });

            it("returns nothing when search filter is not valid", async () => {
                const res = await request(app)
                    .get("/transaction")
                    .query({ shiftLogId: mockedShiftLog.id, search: "john doeeeee" } as TransactionQueryType)
                    .expect(200);

                expect(res.body.transactions).toHaveLength(0);
            });

            it("returns transactions between startDate and endDate", async () => {
                const res = await request(app)
                    .get("/transaction")
                    .query({
                        startDate: YESTERDAY,
                        endDate: TOMORROW,
                        shiftLogId: mockedShiftLog.id,
                    } as TransactionQueryType);

                const expected = mockedTransactions.filter((transaction) => {
                    const createdAt = transaction.createdAt ?? new Date();
                    return createdAt >= YESTERDAY && createdAt <= TOMORROW;
                });

                const notExpected = mockedTransactions.filter((transaction) => {
                    const createdAt = transaction.createdAt ?? new Date();
                    return createdAt < YESTERDAY || createdAt > TOMORROW;
                });

                expect(res.body.transactions).toEqual(
                    expect.arrayContaining(expected.map((tx) => expect.objectContaining(transformMockedDate(tx))))
                );

                expect(res.body.transactions).not.toEqual(
                    expect.arrayContaining(notExpected.map((tx) => expect.objectContaining(transformMockedDate(tx))))
                );

                expect(res.body.transactions).toHaveLength(expected.length);
            });

            it("returns status 404 when startDate is greater than endDate", (done) => {
                request(app)
                    .get("/transaction")
                    .query({
                        shiftLogId: mockedShiftLog.id,
                        startDate: TOMORROW.toISOString(),
                        endDate: YESTERDAY.toISOString(),
                    })
                    .expect(400, done);
            });
        });

        describe("with pagination", () => {
            it("returns transactions under a certain limit", async () => {
                const overallRes = await request(app)
                    .get("/transaction")
                    .query({ shiftLogId: mockedShiftLog.id })
                    .expect(200);
                const limitRes = await request(app)
                    .get("/transaction")
                    .query({ shiftLogId: mockedShiftLog.id, limit: 2 } as TransactionQueryInput)
                    .expect(200);

                expect(limitRes.body.transactions).toHaveLength(2);
                expect(limitRes.body).toHaveProperty("originalSize", overallRes.body.transactions.length);
                expect(limitRes.body).toHaveProperty("responseSize", limitRes.body.transactions.length);
            });

            it("returns status 400 invalid input when page is provided but not limit", (done) => {
                request(app).get("/transaction").query({ page: 1 }).expect(400, done);
            });

            it("returns transactions under a certain page and limit", async () => {
                const limit = 2;
                const page = 2;
                const res = await request(app)
                    .get("/transaction")
                    .query({ shiftLogId: mockedShiftLog.id, limit, page } as TransactionQueryInput)
                    .expect(200);

                const sortedTransactions = [...mockedTransactions].sort(
                    (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
                );

                expect(res.body.transactions).not.toContainEqual(sortedTransactions[0]);

                const expected = sortedTransactions.slice((page - 1) * limit, page * limit);

                expect(res.body.transactions).toEqual(
                    expect.arrayContaining(
                        expected.map((transaction) => expect.objectContaining(transformMockedDate(transaction)))
                    )
                );
            });
        });
    });

    describe("POST /transaction/analytics", () => {
        it("returns overall transaction count", async () => {
            const res = await request(app).post("/transaction/analytics").expect(200);

            expect(res.body).toEqual({
                overall: {
                    count: mockedTransactions.length,
                },
            });
        });

        it("returns count for a query with filters", async () => {
            const payload: TransactionAnalyticsQueryInput = {
                queries: [
                    {
                        type: "DATE_RANGE",
                        id: "filteredCount",
                        filters: {
                            type: "WALK_IN_REFERRAL",
                            outcome: "SUCCESS",
                        },
                    },
                ],
            };

            const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

            const expectedCount = mockedTransactions.reduce(
                (total, transaction) =>
                    transaction.transactionType === TransactionType.WALK_IN_REFERRAL &&
                    transaction.transactionOutcome === Outcome.SUCCESS
                        ? total + 1
                        : total,
                0
            );

            expect(res.body).toEqual({
                filteredCount: {
                    count: expectedCount,
                },
            });
        });

        it("returns full count for a query with empty filters", async () => {
            const payload: TransactionAnalyticsQueryInput = {
                queries: [
                    {
                        type: "DATE_RANGE",
                        id: "emptyFilterCount",
                        filters: {},
                    },
                ],
            };

            const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

            expect(res.body).toEqual({
                emptyFilterCount: {
                    count: mockedTransactions.length,
                },
            });
        });

        describe("date type query", () => {
            it("returns query result using query", async () => {
                const payload: TransactionAnalyticsQueryInput = {
                    queries: [
                        {
                            type: "DATE_RANGE",
                            id: "overallBySex",
                            groupBy: "applicantSex",
                        },
                    ],
                };

                const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

                const expected = mockedTransactions.reduce(
                    (result, transaction) => {
                        const sex = transaction.applicantSex;
                        result[sex] = (result[sex] ?? 0) + 1;
                        return result;
                    },
                    {} as Record<string, number>
                );

                expect(res.body).toEqual({
                    overallBySex: {
                        count: mockedTransactions.length,
                        grouped: expected,
                    },
                });

                expect(res.body).not.toHaveProperty("overall");
            });

            it("returns multiple query results using their ids", async () => {
                const payload: TransactionAnalyticsQueryInput = {
                    queries: [
                        {
                            type: "DATE_RANGE",
                            id: "bySex",
                            groupBy: "applicantSex",
                        },
                        {
                            type: "DATE_RANGE",
                            id: "byType",
                            groupBy: "transactionType",
                        },
                    ],
                };

                const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

                expect(res.body).toEqual({
                    bySex: {
                        count: expect.any(Number),
                        grouped: expect.any(Object),
                    },
                    byType: {
                        count: expect.any(Number),
                        grouped: expect.any(Object),
                    },
                });
                expect(res.body).not.toHaveProperty("overall");
            });

            it("returns current and previous period for a grouped date range query", async () => {
                const startDate = new Date("2026-08-19T00:00:00.000Z");
                const endDate = new Date("2026-08-20T00:00:00.000Z");
                const previousStart = new Date("2026-08-18T00:00:00.000Z");

                const payload: TransactionAnalyticsQueryInput = {
                    queries: [
                        {
                            type: "DATE_RANGE",
                            id: "dailyBySex",
                            startDate,
                            endDate,
                            groupBy: "applicantSex",
                            includePrevious: true,
                        },
                    ],
                };

                const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

                const current = getTransactionsInRange(mockedTransactions, startDate, endDate);
                const previous = getTransactionsInRange(mockedTransactions, previousStart, startDate);

                expect(res.body).toEqual({
                    dailyBySex: {
                        current: {
                            count: current.length,
                            grouped: getExpectedGrouped(current, "applicantSex"),
                        },
                        previous: {
                            count: previous.length,
                            grouped: getExpectedGrouped(previous, "applicantSex"),
                        },
                    },
                });
            });

            it("returns 400 for invalid analytics request", async () => {
                const payload = {
                    queries: [
                        {
                            type: "TEST_TEST",
                            id: "invalid",
                            filters: {},
                        },
                    ],
                };

                const res = await request(app).post("/transaction/analytics").send(payload).expect(400);

                expect(res.body).toHaveProperty("error");
            });

            it("returns 400 for invalid query", async () => {
                const payload = {
                    queries: [
                        {
                            id: 123,
                            groupBy: "applicantSex",
                        },
                    ],
                };

                const res = await request(app).post("/transaction/analytics").send(payload).expect(400);

                expect(res.body).toHaveProperty("error");
            });
        });

        describe("breakdown type query", () => {
            it.each(["HOURLY", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"] as const)(
                "returns %s transaction breakdown",
                async (breakdown) => {
                    const startDate = "2026-01-01T00:00:00.000Z";
                    const endDate = "2026-12-31T23:59:59.999Z";
                    const payload: TransactionAnalyticsQueryInput = {
                        queries: [
                            {
                                type: "BREAKDOWN",
                                id: "breakdown",
                                startDate,
                                endDate,
                                breakdown,
                            },
                        ],
                    };

                    const res = await request(app).post("/transaction/analytics").send(payload).expect(200);
                    const expected = getExpectedBreakdown(mockedTransactions, breakdown, startDate, endDate);

                    expect(res.body).toEqual({
                        breakdown: expected,
                    });
                }
            );

            it("returns query result grouped by user name", async () => {
                const payload: TransactionAnalyticsQueryInput = {
                    queries: [
                        {
                            type: "DATE_RANGE",
                            id: "byUser",
                            groupBy: "userId",
                        },
                    ],
                };

                const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

                const expectedName = `${mockedUser.firstName} ${mockedUser.lastName}`;
                const expected = {
                    [expectedName]: mockedTransactions.length,
                };

                expect(res.body).toEqual({
                    byUser: {
                        count: mockedTransactions.length,
                        grouped: expected,
                    },
                });

                expect(res.body).not.toHaveProperty("overall");
            });
            it("returns daily breakdown grouped by applicant sex", async () => {
                const startDate = "2026-08-01T00:00:00.000Z";
                const endDate = "2026-08-31T23:59:59.999Z";
                const payload: TransactionAnalyticsQueryInput = {
                    queries: [
                        {
                            type: "BREAKDOWN",
                            id: "dailyBySex",
                            startDate,
                            endDate,
                            breakdown: "DAILY",
                            groupBy: "applicantSex",
                        },
                    ],
                };

                const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

                const expected = getExpectedGroupedBreakdown(
                    mockedTransactions,
                    "DAILY",
                    "applicantSex",
                    startDate,
                    endDate
                );

                expect(res.body).toEqual({
                    dailyBySex: expected,
                });
            });

            it("returns daily breakdown grouped by demographics", async () => {
                const startDate = "2026-08-01T00:00:00.000Z";
                const endDate = "2026-08-31T23:59:59.999Z";

                const payload: TransactionAnalyticsQueryInput = {
                    queries: [
                        {
                            type: "BREAKDOWN",
                            id: "dailyByDemographic",
                            startDate,
                            endDate,
                            breakdown: "DAILY",
                            groupBy: "demographics",
                        },
                    ],
                };

                const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

                const expected = getExpectedGroupedBreakdown(
                    mockedTransactions,
                    "DAILY",
                    "demographics",
                    startDate,
                    endDate
                );

                expect(res.body).toEqual({
                    dailyByDemographic: expected,
                });
            });

            it("applies filters to breakdown", async () => {
                const startDate = "2026-08-01T00:00:00.000Z";
                const endDate = "2026-08-31T23:59:59.999Z";

                const payload: TransactionAnalyticsQueryInput = {
                    queries: [
                        {
                            type: "BREAKDOWN",
                            id: "filteredDaily",
                            startDate,
                            endDate,
                            breakdown: "DAILY",
                            filters: {
                                type: "WALK_IN_REFERRAL",
                                outcome: "SUCCESS",
                            },
                        },
                    ],
                };

                const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

                const filteredTransactions = mockedTransactions.filter(
                    (transaction) =>
                        transaction.transactionType === "WALK_IN_REFERRAL" &&
                        transaction.transactionOutcome === "SUCCESS"
                );

                const expected = getExpectedBreakdown(filteredTransactions, "DAILY", startDate, endDate);

                expect(res.body).toEqual({
                    filteredDaily: expected,
                });
            });

            it("applies filters to multiple analytics queries", async () => {
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

                const res = await request(app).post("/transaction/analytics").send(payload).expect(200);

                expect(res.body).toHaveProperty("successfulBySex");
                expect(res.body).toHaveProperty("successfulDaily");
            });
        });
    });

    describe("GET /transaction/id", () => {
        it("returns a transaction with id", async () => {
            const res = await request(app).get("/transaction/1").expect(200);

            const transaction = res.body.transaction as Transaction;
            expect(transaction).toMatchObject(transformMockedDate(mockedTransactions[0]));
            expect(transaction).toHaveProperty("createdAt", expect.any(String));
            expect(transaction.txCode).toMatch(/^TX-\d+-\d+$/);
        });

        it("returns a transaction with txCode", async () => {
            const searchRes = await request(app).get("/transaction/2").expect(200);
            const txCode = searchRes.body.transaction.txCode as string;

            const res = await request(app).get(`/transaction/${txCode}`).expect(200);
            expect(res.body.transaction).toMatchObject(transformMockedDate(mockedTransactions[1]));
        });

        it("returns status 404 when id is not found", (done) => {
            request(app).get("/transaction/99999").expect("Content-Type", /json/).expect(404, done);
        });
    });

    describe("POST /transaction", () => {
        it("creates a transaction", async () => {
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

            const expected = {
                ...transformMockedDate(formData),
                txCode: expect.stringMatching(/^TX-\d+-\d+$/),
            };

            const postRes = await request(app).post("/transaction").send(formData).expect(201);
            expect(postRes.body.transaction).toMatchObject(formData);

            const getRes = await request(app).get("/transaction").query({ shiftLogId: mockedShiftLog.id }).expect(200);
            expect(getRes.body.transactions).toContainEqual(expect.objectContaining(transformMockedDate(expected)));
        }, 300000);

        it("returns status 400 when bad request was made", (done) => {
            const formData: TransactionCreateType = {
                applicantFirstName: "",
                applicantLastName: "",
                transactionType: "IN_HOUSE_RECRUITMENT",
                shiftLogId: mockedShiftLog.id,
                userId: mockedUser.id,
                transactionOutcome: "PENDING",
                applicantSex: "MALE",
                demographics: ["FIRST_TIME_JOB_SEEKER"],
            };

            request(app).post("/transaction").send(formData).expect(400, done);
        });
    });

    describe("PATCH /transaction/id", () => {
        it("updates a transaction by id", async () => {
            const formData: TransactionUpdateType = {
                remarks: "Hello this is an edit testing",
            };

            const patchRes = await request(app).patch("/transaction/1").send(formData).expect(200);
            expect(patchRes.body.transaction).toMatchObject(formData);

            const verifyRes = await request(app).get("/transaction/1").expect(200);
            expect(verifyRes.body.transaction.remarks).toBe(formData.remarks);
        });

        it("updates a transaction by txCode", async () => {
            // 1. Fetch the transaction to get its txCode
            const searchRes = await request(app).get("/transaction/2").expect(200);
            const txCode = searchRes.body.transaction.txCode as string;

            const formData: TransactionUpdateType = {
                remarks: "Hello this is an edit testing",
            };

            const patchRes = await request(app).patch(`/transaction/${txCode}`).send(formData).expect(200);
            expect(patchRes.body.transaction).toMatchObject(formData);

            const verifyRes = await request(app).get(`/transaction/${txCode}`).expect(200);
            expect(verifyRes.body.transaction.remarks).toBe(formData.remarks);
        });

        it("returns status 404 when transaction id is not found", async () => {
            const formData: TransactionUncheckedUpdateInput = {
                remarks: "Hello this is an edit testing",
            };
            await request(app).patch(`/transaction/999`).send(formData).expect(404);
        });
    });

    describe("DELETE /transaction/id", () => {
        it("deletes a transaction by id", async () => {
            await request(app).delete("/transaction/1").expect(204);

            const deletedTransaction = structuredClone(mockedTransactions[0]);
            const getRes = await request(app).get("/transaction").query({ shiftLogId: mockedShiftLog.id }).expect(200);

            getRes.body.transactions.forEach((transaction: Transaction) =>
                expect(transaction).not.toMatchObject(deletedTransaction)
            );
        });

        it("deletes a transaction via txCode", async () => {
            const searchRes = await request(app).get("/transaction/2").expect(200);
            const txCode = searchRes.body.transaction.txCode as string;

            const deletedTransaction = structuredClone(mockedTransactions[1]);
            await request(app).delete(`/transaction/${txCode}`).expect(204);
            const getRes = await request(app).get("/transaction").query({ shiftLogId: mockedShiftLog.id }).expect(200);

            getRes.body.transactions.forEach((transaction: Transaction) =>
                expect(transaction).not.toMatchObject(deletedTransaction)
            );
        });

        it("returns status 404 when transaction id is not found", (done) => {
            request(app).delete("/transaction/999").expect(404, done);
        });
    });
});
