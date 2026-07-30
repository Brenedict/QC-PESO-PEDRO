export interface UserRecord {
    id: string;
    name: string;
    email: string;
    username: string;
    role: "Administrator" | "Frontline Encoder";
    status: "Active" | "Inactive";
}

export const usersData: UserRecord[] = [
    {
        id: "USR-001",
        name: "Maria Santos",
        email: "m.santos@qc.gov.ph",
        username: "@maria.santos",
        role: "Administrator",
        status: "Active",
    },
    {
        id: "USR-002",
        name: "Juan Cruz",
        email: "j.cruz@qc.gov.ph",
        username: "@juan.cruz",
        role: "Frontline Encoder",
        status: "Active",
    },
    {
        id: "USR-003",
        name: "Ana Lim",
        email: "a.lim@qc.gov.ph",
        username: "@ana.lim",
        role: "Frontline Encoder",
        status: "Active",
    },
    {
        id: "USR-004",
        name: "Mark Reyes",
        email: "m.reyes@qc.gov.ph",
        username: "@mark.reyes",
        role: "Frontline Encoder",
        status: "Inactive",
    },
    {
        id: "USR-005",
        name: "System Admin",
        email: "admin@qc.gov.ph",
        username: "@admin",
        role: "Administrator",
        status: "Active",
    },
];
