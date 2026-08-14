import type { Role } from "../types/common";
import type { StatusVariant } from "../components/Status";

export type ConnectionStatus = StatusVariant<"connection">;

export interface EmployeeSession {
    id: string;
    name: string;
    role: Role;
    totalLoginSessions: number;
    lastLogin: Date;
    status: ConnectionStatus;
    loginHistory: {
        dateTimeIn: Date;
        dateTimeOut: Date;
        logoutReason: string;
    }[];
}

export const employeeSessions: EmployeeSession[] = [
    {
        id: "SHFT-0001",
        name: "Maria Santos",
        role: "ADMIN",
        totalLoginSessions: 24,
        lastLogin: new Date("2026-07-29T08:15:00"),
        status: "online",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-28T09:00:00"),
                dateTimeOut: new Date("2026-07-28T12:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-29T08:15:00"),
                dateTimeOut: new Date("2026-07-29T11:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-01T09:00:00"),
                dateTimeOut: new Date("2026-08-01T17:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0002",
        name: "Juan Dela Cruz",
        role: "FRONTLINE",
        totalLoginSessions: 18,
        lastLogin: new Date("2026-07-27T07:45:00"),
        status: "online",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-24T10:00:00"),
                dateTimeOut: new Date("2026-07-24T13:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-27T07:45:00"),
                dateTimeOut: new Date("2026-07-27T10:45:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-30T09:30:00"),
                dateTimeOut: new Date("2026-07-30T17:30:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0003",
        name: "Ana Reyes",
        role: "FRONTLINE",
        totalLoginSessions: 31,
        lastLogin: new Date("2026-07-28T17:30:00"),
        status: "offline",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-25T08:00:00"),
                dateTimeOut: new Date("2026-07-25T12:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-28T17:30:00"),
                dateTimeOut: new Date("2026-07-28T21:30:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-02T10:00:00"),
                dateTimeOut: new Date("2026-08-02T18:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0004",
        name: "Carlos Garcia",
        role: "SUPERADMIN",
        totalLoginSessions: 42,
        lastLogin: new Date("2026-07-29T06:00:00"),
        status: "loggedout",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-27T08:00:00"),
                dateTimeOut: new Date("2026-07-27T12:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-29T06:00:00"),
                dateTimeOut: new Date("2026-07-29T10:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-03T12:00:00"),
                dateTimeOut: new Date("2026-08-03T20:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0005",
        name: "Lisa Morales",
        role: "FRONTLINE",
        totalLoginSessions: 15,
        lastLogin: new Date("2026-07-29T08:30:00"),
        status: "online",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-25T09:30:00"),
                dateTimeOut: new Date("2026-07-25T13:30:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-29T08:30:00"),
                dateTimeOut: new Date("2026-07-29T12:30:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-04T14:00:00"),
                dateTimeOut: new Date("2026-08-04T22:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0006",
        name: "Rafael Torres",
        role: "FRONTLINE",
        totalLoginSessions: 27,
        lastLogin: new Date("2026-07-28T16:20:00"),
        status: "offline",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-24T09:00:00"),
                dateTimeOut: new Date("2026-07-24T13:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-28T16:20:00"),
                dateTimeOut: new Date("2026-07-28T20:20:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-05T10:00:00"),
                dateTimeOut: new Date("2026-08-05T18:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0007",
        name: "Elena Vargas",
        role: "ADMIN",
        totalLoginSessions: 38,
        lastLogin: new Date("2026-07-29T07:55:00"),
        status: "online",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-25T09:00:00"),
                dateTimeOut: new Date("2026-07-25T12:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-29T07:55:00"),
                dateTimeOut: new Date("2026-07-29T10:55:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-01T11:00:00"),
                dateTimeOut: new Date("2026-08-01T19:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0008",
        name: "Miguel Ramos",
        role: "FRONTLINE",
        totalLoginSessions: 9,
        lastLogin: new Date("2026-07-28T15:15:00"),
        status: "loggedout",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-22T08:00:00"),
                dateTimeOut: new Date("2026-07-22T12:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-28T15:15:00"),
                dateTimeOut: new Date("2026-07-28T19:15:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-05T10:00:00"),
                dateTimeOut: new Date("2026-08-05T18:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0009",
        name: "Sofia Castro",
        role: "FRONTLINE",
        totalLoginSessions: 22,
        lastLogin: new Date("2026-07-29T08:20:00"),
        status: "online",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-23T09:30:00"),
                dateTimeOut: new Date("2026-07-23T13:30:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-29T08:20:00"),
                dateTimeOut: new Date("2026-07-29T12:20:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-06T12:00:00"),
                dateTimeOut: new Date("2026-08-06T20:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0010",
        name: "Andres Flores",
        role: "ADMIN",
        totalLoginSessions: 45,
        lastLogin: new Date("2026-07-28T18:00:00"),
        status: "offline",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-20T07:00:00"),
                dateTimeOut: new Date("2026-07-20T11:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-28T18:00:00"),
                dateTimeOut: new Date("2026-07-28T22:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-07T10:00:00"),
                dateTimeOut: new Date("2026-08-07T18:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0011",
        name: "Patricia Lopez",
        role: "FRONTLINE",
        totalLoginSessions: 19,
        lastLogin: new Date("2026-07-29T08:05:00"),
        status: "online",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-22T08:00:00"),
                dateTimeOut: new Date("2026-07-22T12:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-29T08:05:00"),
                dateTimeOut: new Date("2026-07-29T12:05:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-08T09:00:00"),
                dateTimeOut: new Date("2026-08-08T17:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0012",
        name: "Roberto Mendoza",
        role: "FRONTLINE",
        totalLoginSessions: 12,
        lastLogin: new Date("2026-07-29T05:45:00"),
        status: "loggedout",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-20T07:30:00"),
                dateTimeOut: new Date("2026-07-20T11:30:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-29T05:45:00"),
                dateTimeOut: new Date("2026-07-29T09:45:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-09T10:00:00"),
                dateTimeOut: new Date("2026-08-09T18:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0013",
        name: "Carmen Herrera",
        role: "ADMIN",
        totalLoginSessions: 35,
        lastLogin: new Date("2026-07-29T07:30:00"),
        status: "online",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-21T07:00:00"),
                dateTimeOut: new Date("2026-07-21T11:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-29T07:30:00"),
                dateTimeOut: new Date("2026-07-29T11:30:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-10T12:00:00"),
                dateTimeOut: new Date("2026-08-10T20:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0014",
        name: "Fernando Jimenez",
        role: "FRONTLINE",
        totalLoginSessions: 28,
        lastLogin: new Date("2026-07-28T14:45:00"),
        status: "offline",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-19T08:00:00"),
                dateTimeOut: new Date("2026-07-19T12:00:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-28T14:45:00"),
                dateTimeOut: new Date("2026-07-28T18:45:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-11T10:00:00"),
                dateTimeOut: new Date("2026-08-11T18:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
    {
        id: "SHFT-0015",
        name: "Isabel Ruiz",
        role: "FRONTLINE",
        totalLoginSessions: 16,
        lastLogin: new Date("2026-07-29T08:40:00"),
        status: "online",
        loginHistory: [
            {
                dateTimeIn: new Date("2026-07-20T06:45:00"),
                dateTimeOut: new Date("2026-07-20T10:45:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-07-29T08:40:00"),
                dateTimeOut: new Date("2026-07-29T12:40:00"),
                logoutReason: "End Shift",
            },
            {
                dateTimeIn: new Date("2026-08-12T11:00:00"),
                dateTimeOut: new Date("2026-08-12T19:00:00"),
                logoutReason: "End Shift",
            },
        ],
    },
] as const;
