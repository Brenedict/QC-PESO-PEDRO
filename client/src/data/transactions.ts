import type { StatusVariant } from "../components/Status";

export interface Transaction {
    id: string;
    dateTime: Date;
    type: StatusVariant<"type">;
    applicant: string;
    outcome: StatusVariant<"outcome">;
}

export const transactions: Transaction[] = [
    {
        id: "TXN-2024-001",
        dateTime: new Date("2024-01-15T09:30:00"),
        type: "WALK_IN_REFERRAL",
        applicant: "Juan Dela Cruz",
        outcome: "SUCCESS",
    },
    {
        id: "TXN-2024-002",
        dateTime: new Date("2024-01-16T14:15:00"),
        type: "ONLINE_REFERRAL",
        applicant: "Maria Santos",
        outcome: "PENDING",
    },
    {
        id: "TXN-2024-003",
        dateTime: new Date("2024-01-17T10:00:00"),
        type: "IN_HOUSE_RECRUITMENT",
        applicant: "Pedro Reyes",
        outcome: "MISMATCH",
    },
    {
        id: "TXN-2024-004",
        dateTime: new Date("2024-01-18T16:45:00"),
        type: "WALK_IN_REFERRAL",
        applicant: "Ana Garcia",
        outcome: "SUCCESS",
    },
    {
        id: "TXN-2024-005",
        dateTime: new Date("2024-01-19T11:20:00"),
        type: "ONLINE_REFERRAL",
        applicant: "Jose Rodriguez",
        outcome: "PENDING",
    },
    {
        id: "TXN-2024-006",
        dateTime: new Date("2024-01-20T09:00:00"),
        type: "IN_HOUSE_RECRUITMENT",
        applicant: "Luisa Fernandez",
        outcome: "SUCCESS",
    },
    {
        id: "TXN-2024-007",
        dateTime: new Date("2024-01-21T13:30:00"),
        type: "WALK_IN_REFERRAL",
        applicant: "Carlos Mendoza",
        outcome: "MISMATCH",
    },
    {
        id: "TXN-2024-008",
        dateTime: new Date("2024-01-22T15:00:00"),
        type: "ONLINE_REFERRAL",
        applicant: "Rosa Aquino",
        outcome: "PENDING",
    },
];
