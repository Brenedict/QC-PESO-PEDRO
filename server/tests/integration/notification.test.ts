// General Imports
import request from "supertest";
import prisma from "../../src/config/prisma.config";
import { app, setCurrentAuthUser } from "../../jest.integration";
import { beforeEach, describe, expect, it } from "@jest/globals";

// PEDRO SHARED IMPORTS
import type { LogAction } from "@qcpesopedro/shared/prisma/browser";

// Models & Services
import AuditModel from "../../src/models/audit.model";
import NotificationModel from "../../src/models/notification.model";
import AuditService from "../../src/service/audit.service";
import { mockAdminUser, mockFrontlineUser } from "../fixtures/user.fixture";
import { buildMockAuditLog } from "../fixtures/auditLog.fixture";
import notificationRoute from "../../src/routes/notification.route";
import { NotificationResponseType } from "@qcpesopedro/shared/schema/notification";

describe("Notification Routes", () => {
    app.use("/notification", notificationRoute);

    const frontlineId = 2;
    const adminId = 3;

    async function seedNotification(
        recipientId: number,
        actorId: number,
        action: LogAction,
        affectedId: string,
        createdAt?: Date
    ) {
        const audit = await AuditModel.createAuditLog(buildMockAuditLog(actorId, action, affectedId));
        return NotificationModel.createNotification({ recipientId, auditLogId: audit.id, createdAt });
    }

    beforeEach(async () => {
        await prisma.notification.deleteMany();
        await prisma.auditLog.deleteMany();

        await prisma.user.create({ data: mockFrontlineUser });
        await prisma.user.create({ data: mockAdminUser });
    });

    describe("GET /notification", () => {
        it("returns only the current user's notifications with an unread count", async () => {
            await seedNotification(frontlineId, adminId, "TAGGED_END_SHIFT_STATUS_APPROVE", "Shift-1");
            await seedNotification(frontlineId, adminId, "USER_PROMOTED", "frontline");
            await seedNotification(adminId, adminId, "USER_EDITED", "admin");

            setCurrentAuthUser(mockFrontlineUser);

            const res = await request(app).get("/notification").expect(200);

            expect(res.body.unreadCount).toBe(2);
            expect(res.body.notifications).toHaveLength(2);

            res.body.notifications.forEach((notification: NotificationResponseType) => {
                expect(notification.recipientId).toBe(frontlineId);
                expect(notification.auditLog).toMatchObject({
                    actionPerformed: expect.stringMatching(/^[A-Z_]+$/),
                    changesDetails: expect.any(String),
                    user: {
                        id: expect.any(Number),
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        role: expect.any(String),
                    },
                });
            });
        });

        it("returns notifications newest first", async () => {
            const older = await seedNotification(
                frontlineId,
                adminId,
                "TAGGED_END_SHIFT_STATUS_APPROVE",
                "Shift-1",
                new Date(Date.now() - 5_000)
            );
            const newer = await seedNotification(frontlineId, adminId, "USER_PROMOTED", "frontline", new Date());

            setCurrentAuthUser(mockFrontlineUser);

            const res = await request(app).get("/notification").expect(200);

            expect(res.body.notifications.map((n: { id: number }) => n.id)).toEqual([newer.id, older.id]);
        });

        it("returns an empty feed when the user has no notifications", async () => {
            setCurrentAuthUser(mockAdminUser);

            const res = await request(app).get("/notification").expect(200);

            expect(res.body.unreadCount).toBe(0);
            expect(res.body.notifications).toEqual([]);
        });
    });

    describe("PATCH /notification/read", () => {
        it("marks all of the current user's notifications as read", async () => {
            await seedNotification(frontlineId, adminId, "TAGGED_END_SHIFT_STATUS_APPROVE", "Shift-1");
            await seedNotification(frontlineId, adminId, "USER_PROMOTED", "frontline");

            setCurrentAuthUser(mockFrontlineUser);

            await request(app).patch("/notification/read").expect(200);

            const res = await request(app).get("/notification").expect(200);

            expect(res.body.unreadCount).toBe(0);
            expect(res.body.notifications).toHaveLength(2);
            res.body.notifications.forEach((n: { readAt: Date | null }) => {
                expect(n.readAt).not.toBeNull();
            });
        });

        it("does not mark another user's notifications as read", async () => {
            await seedNotification(adminId, adminId, "USER_EDITED", "admin");

            setCurrentAuthUser(mockFrontlineUser);
            await request(app).patch("/notification/read").expect(200);

            setCurrentAuthUser(mockAdminUser);
            const res = await request(app).get("/notification").expect(200);

            expect(res.body.unreadCount).toBe(1);
        });
    });

    describe("format audit log tests", () => {
        it("creates a notification row for each recipient", async () => {
            const created = await AuditService.formatAuditLog({
                actionPerformed: "SUBMITTED_END_SHIFT_STATUS",
                user: { id: frontlineId, name: "Benedict Bin", role: "FRONTLINE" },
                affectedRecordId: "Shift-1",
                changesDetails: "Test shift",
                remarks: "-",
                recipientUserIds: [frontlineId, adminId],
            });

            const notifications = await prisma.notification.findMany({ where: { auditLogId: created.id } });

            expect(notifications).toHaveLength(2);
            expect(notifications.map((n) => n.recipientId)).toEqual(expect.arrayContaining([frontlineId, adminId]));
            notifications.forEach((n) => expect(n.readAt).toBeNull());
        });

        it("does not create a notification row for the sender", async () => {
            const created = await AuditService.formatAuditLog({
                actionPerformed: "SUBMITTED_END_SHIFT_STATUS",
                user: { id: frontlineId, name: "Benedict Bin", role: "FRONTLINE" },
                affectedRecordId: "Shift-1",
                changesDetails: "Test shift",
                remarks: "-",
                recipientUserIds: [frontlineId, frontlineId, adminId, frontlineId],
            });

            const notifications = await prisma.notification.findMany({ where: { auditLogId: created.id } });

            expect(notifications.map((n) => n.recipientId).sort((a, b) => a - b)).toEqual([frontlineId, adminId]);
        });

        it("does not create a notification row for transactions", async () => {
            const created = await AuditService.formatAuditLog({
                actionPerformed: "TRANSACTION_CREATED",
                user: { id: frontlineId, name: "Benedict Bin", role: "FRONTLINE" },
                affectedRecordId: "tx-1",
                changesDetails: "Test transaction",
                remarks: "-",
            });

            const notifications = await prisma.notification.findMany({ where: { auditLogId: created.id } });

            expect(notifications).toHaveLength(0);
        });
    });

    describe("Error handling", () => {
        it("returns 404 when user is missing", async () => {
            setCurrentAuthUser(undefined as unknown as typeof mockAdminUser);

            await request(app).get("/notification").expect(404);
            await request(app).patch("/notification/read").expect(404);
        });
    });
});
