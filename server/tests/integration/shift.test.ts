import request from "supertest";
import { app, setCurrentAuthUser } from "../../jest.integration";
import shiftRoute from "../../src/routes/shift.route";
import DateUtil, { TODAY } from "../../src/utils/date.util";
import ShiftModel from "../../src/models/shift.model";
import { buildMockShiftLogs } from "../fixtures/shiftLog.fixture";
import TransactionModel from "../../src/models/transaction.model";
import UserModel from "../../src/models/user.model";
import {
    Demographic,
    EnvironmentTag,
    ESSStatus,
    Outcome,
    ShiftLog,
    Transaction,
    TransactionType,
} from "@qcpesopedro/shared/prisma/browser";
import { TransactionScalarFieldEnum } from "@qcpesopedro/shared/zod/schemas";
import { buildMockTransactions } from "../fixtures/transaction.fixture";
import TransactionService from "../../src/service/transaction.service";
import { mockAdminUser, mockFrontlineUser } from "../fixtures/user.fixture";
import { User } from "@qcpesopedro/shared/prisma/client";
import authRoute from "../../src/routes/auth.route";

jest.unmock("../../src/middlewares/zod.middleware");
jest.unmock("../../src/middlewares/authorized.middleware");

const mockShiftDates = (shift: ShiftLog) => {
    if (shift.timeOut) shift.timeOut = expect.anything();
    if (shift.lastVerifiedAt) shift.lastVerifiedAt = expect.anything();

    return { ...shift, timeIn: expect.anything() };
};

const mockUserDates = (user: User) => {
    if (user.createdAt) user.createdAt = expect.anything();
    if (user.updatedAt) user.updatedAt = expect.anything();
    if (user.resetTokenExpiresAt) user.resetTokenExpiresAt = expect.anything();

    return user;
};

// GET /shift only resolves the fields you opt into via `include`.
const SHIFT_LIST_INCLUDE =
    "include=shifts&include=pending&include=approved&include=revision&include=rejected&include=average";

// GET /shift/:shiftId only embeds the shift (and its user) when explicitly included.
const SHIFT_DETAIL_INCLUDE = "include=shift&include=user";

// Sources/demographics are gated by `analytics=true`; total/outcomes are gated by
// specific `overview` values rather than a single `overview=true` boolean.
const FULL_OVERVIEW_QUERY =
    "analytics=true&overview=total&overview=none&overview=pending&overview=mismatch&overview=success";

describe("Shift Route", () => {
    let mockedShiftLogs: ShiftLog[];
    let frontlineUser: User | null;
    let adminUser: User | null;

    beforeAll(async () => {
        app.use("/shift", shiftRoute);
        app.use("/auth", authRoute);
    });

    beforeEach(async () => {
        await UserModel.deleteUsers();

        frontlineUser = await UserModel.createUser(mockFrontlineUser);
        adminUser = await UserModel.createUser(mockAdminUser);
        mockedShiftLogs = await ShiftModel.createShifts({ data: buildMockShiftLogs(frontlineUser?.id ?? null) });

        mockedShiftLogs[0] = await ShiftModel.updateShiftById(mockedShiftLogs[0].id, { userId: adminUser?.id ?? null });
    });

    describe("GET /shift", () => {
        it("returns every shift", async () => {
            const res = await request(app).get(`/shift?${SHIFT_LIST_INCLUDE}`).expect(200);

            expect(mockedShiftLogs.length).toBeGreaterThan(0);
            expect(res.body.shifts).toHaveLength(mockedShiftLogs.length);
        });

        it("counts each ESS status exactly", async () => {
            const res = await request(app).get(`/shift?${SHIFT_LIST_INCLUDE}`).expect(200);

            const countBy = (status: string) => mockedShiftLogs.filter((s) => s.status === status).length;

            expect(res.body.pending).toBe(countBy("PENDING"));
            expect(res.body.approved).toBe(countBy("APPROVED"));
            expect(res.body.revision).toBe(countBy("REVISION"));
            expect(res.body.rejected).toBe(countBy("REJECTED"));
        });

        it("returns and formats the average approval interval", async () => {
            const res = await request(app).get(`/shift?${SHIFT_LIST_INCLUDE}`).expect(200);

            const approved = mockedShiftLogs.filter(
                (s) => s.status === "APPROVED" && s.timeOut !== null && s.lastVerifiedAt !== null
            );

            const totalSeconds = approved.reduce((sum, s) => {
                return (
                    sum + Math.floor((new Date(s.lastVerifiedAt!).getTime() - new Date(s.timeOut!).getTime()) / 1000)
                );
            }, 0);

            const expectedSeconds = approved.length > 0 ? totalSeconds / approved.length : 0;
            const expected = DateUtil.formatInterval(expectedSeconds);

            // 1h 30m format
            expect(res.body.average).toMatch(/^(\d+h \d+m|\d+m|N\/A)$/);
            expect(res.body.average).toBe(expected);
        });

        it("includes transaction count user for each shift", async () => {
            const res = await request(app).get(`/shift?${SHIFT_LIST_INCLUDE}`).expect(200);
            expect(res.body.shifts.length).toBeGreaterThan(0);

            for (const shift of res.body.shifts) {
                const count = await TransactionModel.count({ where: { shiftLogId: shift.id } });
                expect(shift._count.transactions).toBe(count);

                if (shift.userId === null) {
                    expect(shift.user).toBeNull();
                } else {
                    const frontlineUser = await UserModel.getById(shift.userId);
                    expect(shift.user).not.toBeNull();
                    expect(shift.user.id).toBe(frontlineUser?.id);
                }
            }
        });

        it("returns shifts whose timeIn falls within a date range", async () => {
            const { startDate, endDate } = DateUtil.buildDayRange(TODAY);
            const todayQuery = `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
            const shiftToday = `/shift?${SHIFT_LIST_INCLUDE}${todayQuery}`;

            const res = await request(app).get(shiftToday).expect(200);

            for (const shift of res.body.shifts) {
                const timeIn = new Date(shift.timeIn);
                expect(timeIn.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
                expect(timeIn.getTime()).toBeLessThanOrEqual(endDate.getTime());
            }
        });

        it("returns no shifts for a day that doesn't have any shifts (except pending)", async () => {
            const { startDate, endDate } = DateUtil.buildDayRange(DateUtil.offsetDays(TODAY, -1));
            const yesterdayQuery = `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
            const shiftYesterday = `/shift?${SHIFT_LIST_INCLUDE}${yesterdayQuery}`;

            const res = await request(app).get(shiftYesterday).expect(200);

            expect(res.body.shifts).toHaveLength(0);
            expect(res.body.pending).toBe(0);
            expect(res.body.approved).toBe(0);
            expect(res.body.average).toBe("N/A");
        });
    });

    describe("GET /shift/:shiftId", () => {
        let transactions: Transaction[];

        const countByField = (field: TransactionScalarFieldEnum, values: string[]) =>
            values.map((v) => transactions.filter((t) => t[field] === v).length);

        beforeEach(async () => {
            transactions = await TransactionService.createTransactionsWithCode(
                buildMockTransactions(frontlineUser?.id ?? null, mockedShiftLogs[0].id)
            );
        });

        it("returns shift details and its user", async () => {
            const res = await request(app).get(`/shift/${mockedShiftLogs[0].id}?${SHIFT_DETAIL_INCLUDE}`).expect(200);
            expect(res.body.shift).toMatchObject(mockShiftDates(mockedShiftLogs[0]));
            expect(res.body.shift.user.id).toBe(adminUser?.id);
        });

        it("returns no other details when overview and analytics are not set", async () => {
            const res = await request(app).get(`/shift/${mockedShiftLogs[0].id}?${SHIFT_DETAIL_INCLUDE}`).expect(200);
            expect(res.body).toStrictEqual({
                shift: { ...mockShiftDates(mockedShiftLogs[0]), user: mockUserDates(adminUser!) },
            });
        });

        it("returns shift sources", async () => {
            const res = await request(app)
                .get(`/shift/${mockedShiftLogs[0].id}?${SHIFT_DETAIL_INCLUDE}&${FULL_OVERVIEW_QUERY}`)
                .expect(200);

            const getStatsByType = (type: TransactionType) => {
                const relevant = transactions.filter((t) => t.transactionType === type);
                const male = relevant.filter((t) => t.applicantSex === "MALE").length;
                const female = relevant.filter((t) => t.applicantSex === "FEMALE").length;
                return { total: relevant.length, male, female };
            };

            const walkins = getStatsByType("WALK_IN_REFERRAL");
            const online = getStatsByType("ONLINE_REFERRAL");
            const inhouse = getStatsByType("IN_HOUSE_RECRUITMENT");

            expect(res.body).toMatchObject({
                total: transactions.length,
                walkins,
                online,
                inhouse,
            });
        });

        it("returns shift demographics", async () => {
            const res = await request(app)
                .get(`/shift/${mockedShiftLogs[0].id}?${SHIFT_DETAIL_INCLUDE}&${FULL_OVERVIEW_QUERY}`)
                .expect(200);
            const countByDemo = (demo: Demographic) => transactions.filter((t) => t.demographics.includes(demo)).length;
            const [firstTime, pwd, senior, youngWorker, workImmersion] = (
                [
                    "FIRST_TIME_JOB_SEEKER",
                    "PERSONS_WITH_DISABILITY",
                    "SENIOR_CITIZEN",
                    "YOUNG_WORKER",
                    "WORK_IMMERSION_INTERNSHIP",
                ] as Demographic[]
            ).map(countByDemo);

            expect(res.body).toMatchObject({
                firstTime,
                pwd,
                senior,
                youngWorker,
                workImmersion,
            });
        });

        it("returns shift outcomes", async () => {
            const res = await request(app)
                .get(`/shift/${mockedShiftLogs[0].id}?${SHIFT_DETAIL_INCLUDE}&${FULL_OVERVIEW_QUERY}`)
                .expect(200);
            const [none, mismatch, pending, success] = countByField("transactionOutcome", [
                "NONE",
                "MISMATCH",
                "PENDING",
                "SUCCESS",
            ] as Outcome[]);

            expect(res.body).toMatchObject({
                none,
                mismatch,
                pending,
                success,
            });
        });
    });

    describe("PATCH /shift/:shiftId/end", () => {
        it("correctly ends a shift when the user has atleast FRONTLINE access", async () => {
            const generalRemarks = "This is a test remark";
            const environmentTags = ["APPLICANT_ISSUES", "BROKEN_EQUIPMENT"] as EnvironmentTag[];

            setCurrentAuthUser(mockFrontlineUser);
            const res = await request(app)
                .patch(`/shift/${mockedShiftLogs[0].id}/end`)
                .send({ generalRemarks, environmentTags })
                .expect(200);

            expect(res.body.message).toBe("Shift successfully ended");

            const shift = await ShiftModel.getShiftLogById(mockedShiftLogs[0].id);
            expect(shift?.timeOut).not.toBe(null);
            expect(shift?.status).toBe("PENDING");
            expect(shift?.generalRemarks).toBe(generalRemarks);
            expect(shift?.environmentTags).toEqual(environmentTags);
        });

        it("clears isRevising on the shift's user when ending a shift", async () => {
            const frontlineShift = mockedShiftLogs.find((s) => s.userId === frontlineUser!.id)!;

            await UserModel.updateUser(frontlineUser!.id, { isRevising: true });

            setCurrentAuthUser(mockFrontlineUser);
            await request(app).patch(`/shift/${frontlineShift.id}/end`).send({ generalRemarks: "done" }).expect(200);

            const updatedUser = await UserModel.getById(frontlineUser!.id);
            expect(updatedUser?.isRevising).toBe(false);
        });

        it("returns status 400 bad request when body is invalid", (done) => {
            request(app)
                .patch(`/shift/${mockedShiftLogs[0].id}/end`)
                .send({ environmentTags: ["INVALID_TAG"] })
                .expect(400, done);
        });
    });

    describe("PATCH /shift/:shiftId/verify", () => {
        it("correctly updates verification of a shift when the user has atleast ADMIN access", async () => {
            const status: ESSStatus = "APPROVED";
            const adminRemarks = "This is a test remark";

            setCurrentAuthUser(mockAdminUser);
            await request(app)
                .patch(`/shift/${mockedShiftLogs[0].id}/verify`)
                .send({ status, adminRemarks, verifierId: adminUser!.id })
                .expect(204);

            const shift = await ShiftModel.getShiftLogById(mockedShiftLogs[0].id);
            expect(shift?.lastVerifiedAt).not.toBe(null);
            expect(shift?.status).toBe(status);
            expect(shift?.adminRemarks).toBe(adminRemarks);
        });

        it("returns status 403 forbidden when user is not ADMIN but tries to verify a shift", (done) => {
            setCurrentAuthUser(mockFrontlineUser);
            request(app).patch(`/shift/${mockedShiftLogs[0].id}/verify`).send({ status: "APPROVED" }).expect(403, done);
        });
    });

    describe("PATCH /shift/:shiftId/revise", () => {
        it("flags the shift's user as revising and returns the revision shift", async () => {
            await UserModel.updateUser(adminUser!.id, { isRevising: false });

            const { user: _user, ...mockedShiftLogWithoutUser } = mockedShiftLogs[0] as ShiftLog & { user: User };
            setCurrentAuthUser(mockAdminUser);
            const res = await request(app).patch(`/shift/${mockedShiftLogs[0].id}/revise`).expect(200);

            expect(res.body.message).toBe("Please revise this shift");
            expect(res.body.revisionShift).toMatchObject(mockShiftDates(mockedShiftLogWithoutUser as ShiftLog));

            const updatedUser = await UserModel.getById(adminUser!.id);
            expect(updatedUser?.isRevising).toBe(true);
        }, 300000);

        it("returns status 403 forbidden when user is not ADMIN but tries to flag a revision", (done) => {
            setCurrentAuthUser(mockFrontlineUser);
            request(app).patch(`/shift/${mockedShiftLogs[0].id}/revise`).expect(403, done);
        });
    });
});
