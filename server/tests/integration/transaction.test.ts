import request from "supertest";
import { app } from "../../jest.integration";
import { buildMockTransactions } from "../fixtures/transaction.fixture";
import transactionRoute from "../../src/routes/transaction.route";
import prisma from "../../src/config/prisma.config";
import { mockUser } from "../fixtures/user.fixture";
import { buildMockShiftLog } from "../fixtures/shiftLog.fixture";
import type { Transaction } from "../../generated/prisma/browser";

describe("Transaction Route", () => {
    let mockedTransactions: Transaction[];

    beforeEach(async () => {
        const user = await prisma.user.create({ data: mockUser });
        const shiftLog = await prisma.shiftLog.create({ data: buildMockShiftLog(user.id) });

        mockedTransactions = buildMockTransactions(user.id, shiftLog.id);
        await prisma.transaction.createMany({ data: mockedTransactions });
    });

    app.use("/transaction", transactionRoute);

    describe("GET /transaction", () => {
        it("returns all transactions", async () => {
            const res = await request(app).get("/transaction").expect("Content-Type", /json/).expect(200);

            expect(res.body).toEqual(
                mockedTransactions.map((transaction) => ({
                    ...transaction,
                    createdAt: transaction.createdAt.toISOString(),
                    code: expect.stringMatching(/TX-\d{6}-\d{3}/),
                }))
            );
        });

        it("returns a transaction with id", async () => {
            const res = await request(app).get("/transaction/1").expect("Content-Type", /json/).expect(200);

            const expectedTransaction = mockedTransactions?.[0];
            expect(res.body).toEqual({
                ...expectedTransaction,
                createdAt: expectedTransaction?.createdAt.toISOString(),
                code: expect.stringMatching(/TX-\d{6}-\d{3}/),
            });
        });
    });
});
