import type { Role } from "../types/common";
import type { StatusVariant } from "../components/Status";

export type ConnectionStatus = StatusVariant<"connection">;

export interface EmployeeSession {
    name: string;
    role: Role;
    totalLoginSessions: number;
    lastLogin: Date;
    status: ConnectionStatus;
}

export const employeeSessions: EmployeeSession[] = [
    {
        name: "Maria Santos",
        role: "admin",
        totalLoginSessions: 24,
        lastLogin: new Date("2026-07-29T08:15:00"),
        status: "online",
    },
    {
        name: "Juan Dela Cruz",
        role: "frontline",
        totalLoginSessions: 18,
        lastLogin: new Date("2026-07-27T07:45:00"),
        status: "online",
    },
    {
        name: "Ana Reyes",
        role: "frontline",
        totalLoginSessions: 31,
        lastLogin: new Date("2026-07-28T17:30:00"),
        status: "offline",
    },
    {
        name: "Carlos Garcia",
        role: "admin",
        totalLoginSessions: 42,
        lastLogin: new Date("2026-07-29T06:00:00"),
        status: "loggedout",
    },
    {
        name: "Lisa Morales",
        role: "frontline",
        totalLoginSessions: 15,
        lastLogin: new Date("2026-07-29T08:30:00"),
        status: "online",
    },
    {
        name: "Rafael Torres",
        role: "frontline",
        totalLoginSessions: 27,
        lastLogin: new Date("2026-07-28T16:20:00"),
        status: "offline",
    },
    {
        name: "Elena Vargas",
        role: "admin",
        totalLoginSessions: 38,
        lastLogin: new Date("2026-07-29T07:55:00"),
        status: "online",
    },
    {
        name: "Miguel Ramos",
        role: "frontline",
        totalLoginSessions: 9,
        lastLogin: new Date("2026-07-28T15:15:00"),
        status: "loggedout",
    },
    {
        name: "Sofia Castro",
        role: "frontline",
        totalLoginSessions: 22,
        lastLogin: new Date("2026-07-29T08:20:00"),
        status: "online",
    },
    {
        name: "Andres Flores",
        role: "admin",
        totalLoginSessions: 45,
        lastLogin: new Date("2026-07-28T18:00:00"),
        status: "offline",
    },
    {
        name: "Patricia Lopez",
        role: "frontline",
        totalLoginSessions: 19,
        lastLogin: new Date("2026-07-29T08:05:00"),
        status: "online",
    },
    {
        name: "Roberto Mendoza",
        role: "frontline",
        totalLoginSessions: 12,
        lastLogin: new Date("2026-07-29T05:45:00"),
        status: "loggedout",
    },
    {
        name: "Carmen Herrera",
        role: "admin",
        totalLoginSessions: 35,
        lastLogin: new Date("2026-07-29T07:30:00"),
        status: "online",
    },
    {
        name: "Fernando Jimenez",
        role: "frontline",
        totalLoginSessions: 28,
        lastLogin: new Date("2026-07-28T14:45:00"),
        status: "offline",
    },
    {
        name: "Isabel Ruiz",
        role: "frontline",
        totalLoginSessions: 16,
        lastLogin: new Date("2026-07-29T08:40:00"),
        status: "online",
    },
] as const;

