export interface ShiftRecord {
    id: string;
    name: string;
    shift: string;
    trans: number;
    dateTime: Date;
    status: "pending" | "approved" | "needsrevision" | "rejected";
}

export const shiftRecords: ShiftRecord[] = [
    {
        id: "TX-001",
        name: "Juan Cruz",
        shift: "Morning",
        trans: 148,
        dateTime: new Date("2026-08-03T17:02:00"),
        status: "pending",
    },
    {
        id: "TX-002",
        name: "Maria Santos",
        shift: "Afternoon",
        trans: 132,
        dateTime: new Date("2026-07-20T17:11:00"),
        status: "approved",
    },
    {
        id: "TX-003",
        name: "Ana Lim",
        shift: "Morning",
        trans: 89,
        dateTime: new Date("2026-07-20T16:45:00"),
        status: "needsrevision",
    },
    {
        id: "TX-004",
        name: "Kenneth Jacobs",
        shift: "Afternoon",
        trans: 89,
        dateTime: new Date("2026-07-20T16:28:00"),
        status: "rejected",
    },
    {
        id: "TX-005",
        name: "Mark Reyes",
        shift: "Morning",
        trans: 115,
        dateTime: new Date("2026-07-20T16:55:00"),
        status: "approved",
    },
    {
        id: "TX-006",
        name: "Sarah Gomez",
        shift: "Afternoon",
        trans: 142,
        dateTime: new Date("2026-07-20T17:20:00"),
        status: "pending",
    },
    {
        id: "TX-007",
        name: "Leo Villanueva",
        shift: "Morning",
        trans: 95,
        dateTime: new Date("2026-07-20T17:00:00"),
        status: "needsrevision",
    },
];
