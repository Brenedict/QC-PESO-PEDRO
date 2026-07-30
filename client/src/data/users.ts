import type { StatusVariant } from "../components/Status";
import type { Role } from "../types/common";

export interface UserRecord {
    id: string;
    name: string;
    email: string;
    username: string;
    role: Role;
    status: StatusVariant<"status">;
}

export const usersData: UserRecord[] = [
    {
        id: "USR-001",
        name: "Maria Santos",
        email: "m.santos@qc.gov.ph",
        username: "@maria.santos",
        role: "admin",
        status: "active",
    },
    {
        id: "USR-002",
        name: "Juan Cruz",
        email: "j.cruz@qc.gov.ph",
        username: "@juan.cruz",
        role: "frontline",
        status: "active",
    },
    {
        id: "USR-003",
        name: "Ana Lim",
        email: "a.lim@qc.gov.ph",
        username: "@ana.lim",
        role: "frontline",
        status: "active",
    },
    {
        id: "USR-004",
        name: "Mark Reyes",
        email: "m.reyes@qc.gov.ph",
        username: "@mark.reyes",
        role: "frontline",
        status: "inactive",
    },
    {
        id: "USR-005",
        name: "System Admin",
        email: "admin@qc.gov.ph",
        username: "@admin",
        role: "admin",
        status: "active",
    },
];
