// PEDRO SHARED IMPORTS
import type { NotificationFeedResponseType } from "@qcpesopedro/shared/schema/notification";

// API Services
import { apiJson, ensureOk } from "./actionService";

// GET: Fetches the current user's notification feed
export const getNotifications = async (): Promise<NotificationFeedResponseType> => {
    const res = await apiJson("/notification", { method: "GET" });

    await ensureOk(res, "Failed to retrieve notifications");

    return res.json();
};

// PATCH: Marks all of the current user's notifications as read
export const markAllNotificationsRead = async (): Promise<void> => {
    const res = await apiJson("/notification/read", { method: "PATCH" });

    await ensureOk(res, "Failed to mark notifications as read");
};
