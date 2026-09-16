// General Imports
import request from "supertest";
import prisma from "../../src/config/prisma.config";
import { app, setCurrentAuthUser } from "../../jest.integration";
import { jest, beforeEach, expect, describe, it } from "@jest/globals";

// Router
import userRouter from "../../src/routes/user.route";

// Fixture
import { mockFrontlineUser, mockAdminUser, mockSuperAdminUser } from "../fixtures/user.fixture";
import { buildMockShiftLog } from "../fixtures/shiftLog.fixture";

import { type User } from "@qcpesopedro/shared/prisma/client";
import ShiftModel from "../../src/models/shift.model";
import UserModel from "../../src/models/user.model";
import { UserQueryInput } from "@qcpesopedro/shared/schema/users";
import UserService from "../../src/service/user.service";

// Use actual role validator
jest.unmock("../../src/middlewares/authorized.middleware");
jest.unmock("../../src/middlewares/zod.middleware");

describe("User Routes", () => {
    app.use("/user", userRouter);

    beforeEach(async () => {
        await prisma.$transaction([
            prisma.shiftLog.deleteMany(),
            prisma.user.deleteMany(),
            prisma.user.createMany({
                data: [mockFrontlineUser, mockAdminUser, mockSuperAdminUser],
            }),
        ]);

        // createMany with explicit ids does NOT advance the autoincrement sequence.
        // Sync it to MAX(id) so a later insert-without-id (e.g. POST /user) never
        // collides with the fixture rows.
        await prisma.$executeRawUnsafe(
            `SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "User"))`
        );
    });

    describe("GET /user/me", () => {
        it("returns the expected user", async () => {
            setCurrentAuthUser(mockFrontlineUser);

            const res = await request(app).get("/user/me").expect(200);

            expect(res.body).toMatchObject({
                id: mockFrontlineUser.id,
                email: mockFrontlineUser.email,
                username: mockFrontlineUser.username,
                role: mockFrontlineUser.role,
                status: mockFrontlineUser.status,
                firstName: mockFrontlineUser.firstName,
                lastName: mockFrontlineUser.lastName,
                notifSoundEnabled: true,
            });
        });

        it("reuses the existing unfinished shift instead of creating a new one", async () => {
            setCurrentAuthUser(mockFrontlineUser);

            const existingShift = await ShiftModel.createShift({
                data: buildMockShiftLog(mockFrontlineUser.id),
            });

            const res = await request(app).get("/user/me").expect(200);

            expect(res.body.shiftLog.id).toBe(existingShift.id);

            const shiftCount = await ShiftModel.count({ where: { userId: mockFrontlineUser.id } });
            expect(shiftCount).toBe(1);
        });

        it("returns 404 when the authenticated user is missing", (done) => {
            setCurrentAuthUser(undefined as unknown as User);

            request(app).get("/user/me").expect(404, done);
        });
    });

    describe("PATCH /user/preferences", () => {
        it("updates the current user's notifSoundEnabled in the DB and reflects it on /user/me", async () => {
            setCurrentAuthUser(mockFrontlineUser);

            await request(app).patch("/user/preferences").send({ notifSoundEnabled: false }).expect(200);

            const stored = await UserModel.getById(mockFrontlineUser.id);
            expect(stored?.notifSoundEnabled).toBe(false);

            setCurrentAuthUser({ ...mockFrontlineUser, notifSoundEnabled: false });
            const res = await request(app).get("/user/me").expect(200);
            expect(res.body.notifSoundEnabled).toBe(false);
        });

        it("does not affect another user's preference", async () => {
            setCurrentAuthUser(mockFrontlineUser);

            await request(app).patch("/user/preferences").send({ notifSoundEnabled: false }).expect(200);

            const storedAdmin = await UserModel.getById(mockAdminUser.id);
            expect(storedAdmin?.notifSoundEnabled).toBe(true);

            setCurrentAuthUser(mockAdminUser);
            const res = await request(app).get("/user/me").expect(200);
            expect(res.body.notifSoundEnabled).toBe(true);
        });
    });

    describe("GET /user/:userId", () => {
        it("returns 404 for a non existing user id", (done) => {
            setCurrentAuthUser(mockAdminUser);

            request(app).get("/user/999999").expect(404, done);
        });

        it("returns the correct user record for a valid id", async () => {
            setCurrentAuthUser(mockAdminUser);

            const res = await request(app).get(`/user/${mockFrontlineUser.id}`).expect(200);

            expect(res.body).toMatchObject({
                id: mockFrontlineUser.id,
                email: mockFrontlineUser.email,
                username: mockFrontlineUser.username,
            });
        });
    });

    describe("GET /user", () => {
        it("returns all users", async () => {
            setCurrentAuthUser(mockAdminUser);

            const res = await request(app).get("/user").expect(200);
            const { active, inactive } = await UserService.getActiveAndInactiveCount();

            expect(res.body).toHaveProperty("total", await UserModel.count());
            expect(res.body).toHaveProperty("active", active);
            expect(res.body).toHaveProperty("inactive", inactive);
            expect(res.body).toHaveProperty("roles", await UserService.getRolesCount());
            expect(Array.isArray(res.body.users)).toBe(true);
            expect(res.body.users.length).toBeGreaterThanOrEqual(3);
        });

        it("filters users by role", async () => {
            setCurrentAuthUser(mockAdminUser);

            const res = await request(app)
                .get("/user")
                .query({ role: "SUPERADMIN" } as UserQueryInput)
                .expect(200);
            expect(Array.isArray(res.body.users)).toBe(true);
            for (const u of res.body.users) {
                expect(u.role).toBe("SUPERADMIN");
            }
        });

        it("filters users by status", async () => {
            setCurrentAuthUser(mockAdminUser);

            // Active test
            const activeRes = await request(app)
                .get("/user")
                .query({ status: "ACTIVE" } as UserQueryInput)
                .expect(200);

            expect(Array.isArray(activeRes.body.users)).toBe(true);
            for (const u of activeRes.body.users) {
                expect(u.status).toBe("ONLINE");
            }

            // Inactive test
            const inactiveRes = await request(app)
                .get("/user")
                .query({ status: "INACTIVE" } as UserQueryInput)
                .expect(200);

            expect(Array.isArray(inactiveRes.body.users)).toBe(true);
            for (const u of inactiveRes.body.users) {
                expect(u.status).not.toBe("ONLINE");
            }
        });

        it("filters users by search", async () => {
            setCurrentAuthUser(mockAdminUser);

            const search = mockFrontlineUser.firstName.slice(0, 3).toLowerCase();
            const res = await request(app).get("/user").query({ search }).expect(200);
            expect(Array.isArray(res.body.users)).toBe(true);
            expect(res.body.users.length).toBeGreaterThan(0);
            expect(res.body.users.some((u: { id: number }) => u.id === mockFrontlineUser.id)).toBe(true);
        });
    });

    describe("POST /user", () => {
        const payload = {
            username: "brandNewUser",
            email: "brandnewuser@example.com",
            role: "FRONTLINE",
            status: "ONLINE",
            shift: "MORNING",
            firstName: "Brand",
            lastName: "New",
        };

        it("creates a user successfully with valid, unique data", async () => {
            setCurrentAuthUser(mockAdminUser);

            const res = await request(app).post("/user").send(payload).expect(200);
            expect(res.body).toMatchObject({
                username: payload.username,
                email: payload.email,
            });

            const created = await UserModel.getByEmail(payload.email);
            expect(created).not.toBeNull();
        });

        it("returns 409 when the email is already registered", (done) => {
            setCurrentAuthUser(mockAdminUser);

            request(app)
                .post("/user")
                .send({ ...payload, email: mockFrontlineUser.email })
                .expect(409, done);
        });

        it("returns 409 when the username is already taken", (done) => {
            setCurrentAuthUser(mockAdminUser);

            request(app)
                .post("/user")
                .send({ ...payload, username: mockFrontlineUser.username })
                .expect(409, done);
        });
    });

    describe("PATCH /user/:userId", () => {
        it("returns 404 when updating a non existing user", (done) => {
            setCurrentAuthUser(mockAdminUser);

            request(app)
                .patch("/user/999999/USER_EDITED")
                .send({ username: "lebron_jr_67" })
                .expect(404, done);
        });

        it("forbids an ADMIN from granting SUPERADMIN privileges", async () => {
            setCurrentAuthUser(mockAdminUser);

            await request(app)
                .patch(`/user/${mockFrontlineUser.id}/USER_PROMOTED`)
                .send({ role: "SUPERADMIN" })
                .expect(403);

            const unchanged = await UserModel.getById(mockFrontlineUser.id);
            expect(unchanged?.role).not.toBe("SUPERADMIN");
        });

        it("allows a SUPERADMIN to grant SUPERADMIN privileges", async () => {
            setCurrentAuthUser(mockSuperAdminUser);

            await request(app)
                .patch(`/user/${mockFrontlineUser.id}/USER_PROMOTED`)
                .send({ role: "SUPERADMIN" })
                .expect(201);

            const updated = await UserModel.getById(mockFrontlineUser.id);
            expect(updated?.role).toBe("SUPERADMIN");
        });

        it("persists field updates to the database", async () => {
            setCurrentAuthUser(mockAdminUser);

            await request(app)
                .patch(`/user/${mockFrontlineUser.id}/USER_EDITED`)
                .send({ firstName: "Updated" })
                .expect(201);

            const updated = await UserModel.getById(mockFrontlineUser.id);
            expect(updated?.firstName).toBe("Updated");
        });
    });

    describe("PATCH /user/:userId/reset-password", () => {
        it("returns 404 when resetting password for a non-existent user", async () => {
            setCurrentAuthUser(mockAdminUser);

            await request(app).patch("/user/999999/reset-password").expect(404);
        });

        it("actually changes the stored password hash for an existing user", async () => {
            setCurrentAuthUser(mockAdminUser);

            const before = await UserModel.getById(mockFrontlineUser.id);

            await request(app).patch(`/user/${mockFrontlineUser.id}/reset-password`).expect(204);

            const after = await UserModel.getById(mockFrontlineUser.id);
            expect(after?.password).not.toBe(before?.password);
        });
    });

    describe("DELETE /user/:userId", () => {
        it("returns 404 when deleting a non-existent user", (done) => {
            setCurrentAuthUser(mockAdminUser);
            request(app).delete("/user/999999").expect(404, done);
        });

        it("actually removes the user record from the database", async () => {
            setCurrentAuthUser(mockAdminUser);

            await request(app).delete(`/user/${mockFrontlineUser.id}`).expect(204);

            const deleted = await UserModel.getById(mockFrontlineUser.id);
            expect(deleted).toBeNull();
        });
    });
});
