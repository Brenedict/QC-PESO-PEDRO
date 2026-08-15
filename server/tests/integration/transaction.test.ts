import request from "supertest";
import { app } from "../../jest.integration";
import { buildMockTransactions } from "../fixtures/transaction.fixture";
import transactionRoute from "../../src/routes/transaction.route";
import prisma from "../../src/config/prisma.config";
import { mockUser } from "../fixtures/user.fixture";
import { buildMockShiftLog } from "../fixtures/shiftLog.fixture";
import {
    Outcome,
    TransactionType,
    type Transaction,
    type ShiftLog,
    type User,
} from "@qcpesopedro/shared/prisma/client";
import type { TransactionUncheckedUpdateInput } from "@qcpesopedro/shared/prisma/models";
import TransactionService from "../../src/service/transaction.service";
import { TransactionCreateType, TransactionUpdateType } from "@qcpesopedro/shared/schema/transactions";

describe("Transaction Route", () => {
    let mockedTransactions: TransactionCreateType[];
    let mockedUser: User;
    let mockedShiftLog: ShiftLog;

    beforeEach(async () => {
        mockedUser = await prisma.user.create({ data: mockUser });
        mockedShiftLog = await prisma.shiftLog.create({ data: buildMockShiftLog(mockedUser.id) });

        mockedTransactions = buildMockTransactions(mockedUser.id, mockedShiftLog.id);
        await TransactionService.createTransactionsWithCode(mockedTransactions);
    });

    app.use("/transaction", transactionRoute);

    describe("GET /transaction", () => {
        it("returns all transactions", async () => {
            const res = await request(app).get("/transaction").expect(200);

            const transactions = res.body.transactions;
            expect(res.body).not.toHaveProperty("originalSize");
            expect(res.body).toHaveProperty("responseSize", transactions.length);

            transactions.forEach((transaction: Transaction, i: number) =>
                expect(transaction).toMatchObject({
                    ...mockedTransactions[i],
                    createdAt: expect.any(String),
                    txCode: expect.stringMatching(/^TX-\d{6}-\d+$/),
                })
            );
        });

        describe("with filters", () => {
            it("returns transactions with type filter", async () => {
                await request(app).get("/transaction").expect(200);
                const res = await request(app).get(`/transaction`).query({ type: TransactionType.WALK_IN_REFERRAL });

                expect(res.body).not.toHaveProperty("originalSize");
                expect(res.body).toHaveProperty("responseSize", res.body.transactions.length);

                res.body.transactions.forEach((transaction: Transaction) => {
                    expect(transaction).toHaveProperty("transactionType", TransactionType.WALK_IN_REFERRAL);
                });
            });

            it("returns transactions with outcome filter", async () => {
                const res = await request(app).get(`/transaction`).query({ outcome: Outcome.PENDING });

                res.body.transactions.forEach((transaction: Transaction) => {
                    expect(transaction).toHaveProperty("transactionOutcome", Outcome.PENDING);
                });
            });

            it("returns transactions with both type and outcome filter", async () => {
                const res = await request(app)
                    .get(`/transaction`)
                    .query({ outcome: Outcome.PENDING, type: TransactionType.WALK_IN_REFERRAL });

                res.body.transactions.forEach((transaction: Transaction) => {
                    expect(transaction).toHaveProperty("transactionOutcome", TransactionType.WALK_IN_REFERRAL);
                    expect(transaction).toHaveProperty("transactionOutcome", Outcome.PENDING);
                });
            });
        });

        describe("with pagination", () => {
            it("returns transactions under a certain limit", async () => {
                const overallRes = await request(app).get("/transaction").expect(200);
                const limitRes = await request(app).get("/transaction").query({ limit: 2 }).expect(200);

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
                const res = await request(app).get("/transaction").query({ limit, page }).expect(200);

                expect(res.body.transactions).not.toContainEqual(mockedTransactions[0]);

                const expected = mockedTransactions.slice((page - 1) * limit, page * limit);

                expect(res.body.transactions).toEqual(
                    expect.arrayContaining(expected.map((transaction) => expect.objectContaining(transaction)))
                );
            });
        });

        it("returns a transaction with id", async () => {
            const res = await request(app).get("/transaction/1").expect(200);

            const transaction = res.body.transaction as Transaction;
            expect(transaction).toMatchObject(mockedTransactions[0]);
            expect(transaction).toHaveProperty("createdAt", expect.any(String));
            expect(transaction.txCode).toMatch(/^TX-\d{6}-\d+$/);
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
                ...formData,
                createdAt: expect.any(String),
                txCode: expect.stringMatching(/^TX-\d{6}-\d+$/),
            };

            const postRes = await request(app).post("/transaction").send(formData).expect(201);
            expect(postRes.body.transaction).toMatchObject(formData);

            const getRes = await request(app).get("/transaction").expect(200);
            expect(getRes.body.transactions).toContainEqual(expect.objectContaining(expected));
        });

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
        it("updates a transaction", async () => {
            const formData: TransactionUpdateType = {
                remarks: "Hello this is an edit testing",
            };

            const patchRes = await request(app).patch("/transaction/1").send(formData).expect(201);
            expect(patchRes.body.transaction).toMatchObject(formData);

            const getRes = await request(app).get("/transaction/1");
            expect(getRes.body.transaction).toHaveProperty("remarks", formData.remarks);
        });

        it("returns status 404 when transaction id is not found", async () => {
            const formData: TransactionUncheckedUpdateInput = {
                remarks: "Hello this is an edit testing",
            };
            await request(app).patch(`/transaction/999`).send(formData).expect(404);
        });
    });

    describe("DELETE /transaction/id", () => {
        it("deletes a transaction", async () => {
            await request(app).delete("/transaction/1").expect(204);

            const deletedTransaction = structuredClone(mockedTransactions[0]);
            const getRes = await request(app).get("/transaction");

            getRes.body.transactions.forEach((transaction: Transaction) =>
                expect(transaction).not.toMatchObject(deletedTransaction)
            );
        });

        it("returns status 404 when transaction id is not found", (done) => {
            request(app).delete("/transaction/999").expect(404, done);
        });
    });
});
