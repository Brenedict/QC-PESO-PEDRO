// General Imports
import { useCallback, useEffect, useRef, useState } from "react";

// Material UI Icons
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";

// PEDRO SHARED IMPORTS
import type { NotificationResponseType } from "@qcpesopedro/shared/schema/notification";

// Components
import Button from "./Button";
import Icon from "./Icon";
import { Text } from "./Text";
import { Card } from "./Card";

// API Services
import { getNotifications, markAllNotificationsRead } from "../api/notifService";
import { refreshUserContext } from "../api/authService";

// Context
import { useAuth } from "../context/AuthContext";

// Utils
import { formatRelativeDateTime } from "../utils/time";
import { playNotificationSound, unlockAudio } from "../utils/notifSound";
import type { LogAction } from "@qcpesopedro/shared/prisma/browser";

const ACCOUNT_CHANGE_ACTIONS = new Set<LogAction>([
    "USER_PROMOTED",
    "USER_DEMOTED",
    "USER_EDITED",
    "USER_ACCOUNT_ENABLED",
    "USER_ACCOUNT_DISABLED",
    "USER_PASSWORD_RESET",
    "USER_PASSWORD_CHANGE",
]);

function NotificationItem({ notification }: { notification: NotificationResponseType }) {
    const auditLog = notification.auditLog;
    const actor = auditLog?.user;
    const isUnread = notification.readAt == null;

    return (
        <div className="flex gap-3 border-b border-off-white-border px-6 py-3 last:border-b-0">
            <div className="mt-1.5 flex min-w-2 justify-center">
                {isUnread && <div className="h-2 w-2 rounded-full bg-red" />}
            </div>

            <div className="min-w-0 flex-1">
                <Text size="description" variant="dark-blue" weight="medium">
                    {auditLog?.changesDetails ?? "Notification no longer available"}
                </Text>

                {actor && (
                    <Text size="small" variant="grayish-blue" weight="normal">
                        {`${actor.firstName} ${actor.lastName}`} · {actor.role}
                    </Text>
                )}

                <Text size="small" variant="grayish-blue" weight="normal">
                    {formatRelativeDateTime(notification.createdAt)}
                </Text>
            </div>
        </div>
    );
}

export default function NotificationsDropdown() {
    const [open, setOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<NotificationResponseType[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { user } = useAuth();
    const soundEnabled = user?.notifSoundEnabled ?? true;

    const openRef = useRef(open);
    const prevUnreadRef = useRef(0);
    const firstLoadRef = useRef(true);
    const handledIdsRef = useRef<Set<number>>(new Set());

    useEffect(() => {
        openRef.current = open;
    }, [open]);

    const refresh = useCallback(async () => {
        try {
            const feed = await getNotifications();

            // Play sound if unread count has increased
            if (!firstLoadRef.current && !openRef.current && feed.unreadCount > prevUnreadRef.current && soundEnabled) {
                playNotificationSound();
            }

            // Account actions (e.g. yung mga promote/demote/edit/enable/disable) refresh natin topBar
            // para mag reflect yung change sa user
            const newAccountChanges = feed.notifications.filter(
                (notification) =>
                    !handledIdsRef.current.has(notification.id) &&
                    notification.auditLog &&
                    ACCOUNT_CHANGE_ACTIONS.has(notification.auditLog.actionPerformed as LogAction)
            );

            newAccountChanges.forEach((notification) => handledIdsRef.current.add(notification.id));

            if (newAccountChanges.length > 0) {
                void refreshUserContext();
            }

            firstLoadRef.current = false;
            prevUnreadRef.current = feed.unreadCount;

            setUnreadCount(feed.unreadCount);
            setNotifications(feed.notifications);
        } catch (err) {
            console.error("Failed to fetch notifications:", err);
        }
    }, [soundEnabled]);

    // Fetch on mount and find new notifications every 60 seconds.
    useEffect(() => {
        const initial = setTimeout(() => void refresh(), 0);
        const key = setInterval(() => void refresh(), 60 * 1000);

        return () => {
            clearTimeout(initial);
            clearInterval(key);
        };
    }, [refresh]);

    // Close on outside click or Escape
    useEffect(() => {
        if (!open) return;

        const onMouseDown = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    const markAllRead = async () => {
        try {
            await markAllNotificationsRead();
            prevUnreadRef.current = 0;
            setUnreadCount(0);
            setNotifications((prev) => prev.map((n) => (n.readAt == null ? { ...n, readAt: new Date() } : n)));
        } catch (err) {
            console.error("Failed to mark notifications as read:", err);
        }
    };

    const handleBellClick = async () => {
        unlockAudio();

        if (open) {
            setOpen(false);
            return;
        }

        setOpen(true);
        await refresh();

        if (unreadCount > 0) {
            await markAllRead();
        }
    };

    return (
        <div ref={wrapperRef} className="relative">
            <Button
                onClick={handleBellClick}
                size="small"
                variant="white-black"
                className="min-w-0! aspect-square h-10 w-auto"
            >
                <Icon
                    variant={unreadCount > 0 ? "red" : "grayish-blue"}
                    icon={unreadCount > 0 ? NotificationImportantOutlinedIcon : NotificationsNoneOutlinedIcon}
                    size="big"
                />
            </Button>

            {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red px-1 text-smaller-description font-bold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}

            {open && (
                <Card className="absolute right-0 top-full z-60 mt-2 w-90">
                    <Card.Header variant="white">
                        <Text size="description" variant="dark-blue" weight="semiBold">
                            Notifications
                        </Text>

                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={markAllRead}
                                className="text-small-description font-medium text-primary-blue hover:underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </Card.Header>

                    <div className="max-h-120 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="px-6 py-8 text-center">
                                <Text size="description" variant="grayish-blue" weight="normal">
                                    No notifications yet
                                </Text>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
}
