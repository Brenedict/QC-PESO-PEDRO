import type { StatusVariant } from "../components/Status";
import type { Role } from "../types/common";

export interface UserRecord {
    id: string;
    firstName: string; 
    lastName: string; 
    email: string;
    username: string;
    role: Role;
    status: StatusVariant<"status">;
}

export const usersData: UserRecord[] = [
    {
        id: "USR-001",
        firstName: "Maria",
        lastName: "Santos",
        email: "m.santos@qc.gov.ph",
        username: "@maria.santos",
        role: "admin",
        status: "active",
    },
    {
        id: "USR-002",
        firstName: "Juan",
        lastName: "Cruz",
        email: "j.cruz@qc.gov.ph",
        username: "@juan.cruz",
        role: "frontline",
        status: "active",
    },
    {
        id: "USR-003",
        firstName: "Ana",
        lastName: "Lim",
        email: "a.lim@qc.gov.ph",
        username: "@ana.lim",
        role: "frontline",
        status: "disabled",
    },
    {
        id: "USR-004",
        firstName: "Mark",
        lastName: "Reyes",
        email: "m.reyes@qc.gov.ph",
        username: "@mark.reyes",
        role: "frontline",
        status: "inactive",
    },
    {
        id: "USR-005",
        firstName: "System",
        lastName: "Admin",
        email: "admin@qc.gov.ph",
        username: "@admin",
        role: "superadmin", 
        status: "active",
    },
];
