// General Imports
import NotificationModel from "../models/notification.model";

export default {
    async getNotificationsForUser(userId: number) {
        const [notifications, unreadCount] = await Promise.all([
            NotificationModel.findForUser(userId),
            NotificationModel.countUnread(userId),
        ]);

        return { unreadCount, notifications };
    },

    markAllRead(userId: number) {
        return NotificationModel.markAllRead(userId);
    },
};