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
import type {
    TransactionUncheckedCreateInput,
    TransactionUncheckedUpdateInput,
} from "@qcpesopedro/shared/prisma/models";
import { CodedTransaction } from "../../src/service/transaction.service";

const stringifyDates = <T extends Record<string, unknown>>(obj: T) => {
    const { createdAt, ...rest } = obj ?? {};
    return {
        ...rest,
        createdAt: createdAt ? new Date(createdAt as Date).toISOString() : createdAt,
    };
};

describe("Transaction Route", () => {
    let mockedTransactions: Transaction[];
    let mockedUser: User;
    let mockedShiftLog: ShiftLog;

    beforeEach(async () => {
        mockedUser = await prisma.user.create({ data: mockUser });
        mockedShiftLog = await prisma.shiftLog.create({ data: buildMockShiftLog(mockedUser.id) });

        mockedTransactions = buildMockTransactions(mockedUser.id, mockedShiftLog.id);
        await prisma.transaction.createMany({ data: mockedTransactions });
    });

    app.use("/transaction", transactionRoute);

    describe("GET /transaction", () => {
        it("returns all transactions", async () => {
            const res = await request(app).get("/transaction").expect(200);

            expect(res.body).toEqual(
                mockedTransactions.map((transaction) => ({
                    ...stringifyDates(transaction),
                    code: expect.stringMatching(/TXN-\d{6}-\d{3}/),
                }))
            );
        }, 300000);

        it("returns transactions with filters", async () => {
            const resType = await request(app).get(`/transaction`).query({ type: TransactionType.WALK_IN_REFERRAL });

            resType.body.forEach((transaction: CodedTransaction) => {
                expect(transaction).toHaveProperty("transactionType", TransactionType.WALK_IN_REFERRAL);
            });

            const resOutcome = await request(app).get(`/transaction`).query({ outcome: Outcome.PENDING });

            resOutcome.body.forEach((transaction: CodedTransaction) => {
                expect(transaction).toHaveProperty("transactionOutcome", Outcome.PENDING);
            });

            const resBoth = await request(app)
                .get(`/transaction`)
                .query({ outcome: Outcome.PENDING, type: TransactionType.WALK_IN_REFERRAL });

            resBoth.body.forEach((transaction: CodedTransaction) => {
                expect(transaction).toHaveProperty("transactionOutcome", TransactionType.WALK_IN_REFERRAL);
                expect(transaction).toHaveProperty("transactionOutcome", Outcome.PENDING);
            });
        });

        it("returns a transaction with id", async () => {
            const res = await request(app).get("/transaction/1").expect(200);

            const expectedTransaction = mockedTransactions?.[0];
            expect(res.body).toEqual({
                ...stringifyDates(expectedTransaction as Transaction),
                code: expect.stringMatching(/TXN-\d{6}-\d{3}/),
            });
        });

        it("returns status 404 when id is not found", (done) => {
            request(app).get("/transaction/99999").expect("Content-Type", /json/).expect(404, done);
        });
    });

    describe("POST /transaction", () => {
        it("creates a transaction", async () => {
            const formData: TransactionUncheckedCreateInput = {
                applicantFirstName: "John",
                applicantLastName: "Doe",
                transactionType: "IN_HOUSE_RECRUITMENT",
                shiftLogId: mockedShiftLog.id,
                userId: mockedUser.id,
                transactionOutcome: "PENDING",
                applicantSex: "MALE",
                demographics: ["FIRST_TIME_JOB_SEEKER"],
            };

            await request(app).post("/transaction").send(formData).expect(formData);

            const res = await request(app).get("/transaction").expect(200);
            expect(res.body).toContainEqual(expect.objectContaining(formData));
        });

        it("returns status 400 when bad request was made", (done) => {
            const formData: TransactionUncheckedCreateInput = {
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
            const formData: TransactionUncheckedUpdateInput = {
                remarks: "Hello this is an edit testing",
            };

            await request(app).patch("/transaction/1").send(formData).expect(201);
            const res = await request(app).get("/transaction/1");
            expect(res.body).toHaveProperty("remarks", formData.remarks);
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

            const res = await request(app).get("/transaction");
            const deletedTransaction = structuredClone(mockedTransactions[0]);

            expect(res.body).not.toContainEqual(
                expect.objectContaining(stringifyDates(deletedTransaction as Transaction))
            );
        });

        it("returns status 404 when transaction id is not found", (done) => {
            request(app).delete("/transaction/999").expect(404, done);
        });
    });
});
