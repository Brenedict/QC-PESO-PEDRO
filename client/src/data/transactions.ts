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
        type: "walkin",
        applicant: "Juan Dela Cruz",
        outcome: "success",
    },
    {
        id: "TXN-2024-002",
        dateTime: new Date("2024-01-16T14:15:00"),
        type: "online",
        applicant: "Maria Santos",
        outcome: "pending",
    },
    {
        id: "TXN-2024-003",
        dateTime: new Date("2024-01-17T10:00:00"),
        type: "inhouse",
        applicant: "Pedro Reyes",
        outcome: "mismatched",
    },
    {
        id: "TXN-2024-004",
        dateTime: new Date("2024-01-18T16:45:00"),
        type: "walkin",
        applicant: "Ana Garcia",
        outcome: "success",
    },
    {
        id: "TXN-2024-005",
        dateTime: new Date("2024-01-19T11:20:00"),
        type: "online",
        applicant: "Jose Rodriguez",
        outcome: "pending",
    },
    {
        id: "TXN-2024-006",
        dateTime: new Date("2024-01-20T09:00:00"),
        type: "inhouse",
        applicant: "Luisa Fernandez",
        outcome: "success",
    },
    {
        id: "TXN-2024-007",
        dateTime: new Date("2024-01-21T13:30:00"),
        type: "walkin",
        applicant: "Carlos Mendoza",
        outcome: "mismatched",
    },
    {
        id: "TXN-2024-008",
        dateTime: new Date("2024-01-22T15:00:00"),
        type: "online",
        applicant: "Rosa Aquino",
        outcome: "pending",
    },
];
