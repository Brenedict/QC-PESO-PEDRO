export interface AuditLogRecord {
    id: string;
    dateTime: Date;
    userName: string;
    userRole: string;
    action: string;
    recordId: string;
    details: string;
    remarks: string;
}

export const auditLogData: AuditLogRecord[] = [
    {
        id: "AL-001",
        dateTime: new Date("2026-07-17T10:45:00"),
        userName: "Juan Cruz",
        userRole: "Frontline Encoder",
        action: "Transaction Created",
        recordId: "TX-260717-003",
        details: "Added new Walk-in",
        remarks: "-",
    },
    {
        id: "AL-002",
        dateTime: new Date("2026-07-17T10:42:00"),
        userName: "Maria Santos",
        userRole: "Administrator",
        action: "End Shift Approved",
        recordId: "Shift-501",
        details: "Status: Pending → Approved",
        remarks: "Verified totals",
    },
    {
        id: "AL-003",
        dateTime: new Date("2026-07-17T09:15:00"),
        userName: "System Admin",
        userRole: "Administrator",
        action: "User Role Changed",
        recordId: "User-AnaLim",
        details: "Role: Encoder → Admin",
        remarks: "Promotion",
    },
    {
        id: "AL-004",
        dateTime: new Date("2026-07-16T17:30:00"),
        userName: "Mark Reyes",
        userRole: "Administrator",
        action: "End Shift Returned",
        recordId: "Shift-492",
        details: "Status: Pending → Revision",
        remarks: "Mismatch in male/female count",
    },
    {
        id: "AL-005",
        dateTime: new Date("2026-07-16T16:10:00"),
        userName: "Juan Cruz",
        userRole: "Frontline Encoder",
        action: "Transaction Updated",
        recordId: "TX-260716-042",
        details: "Outcome: Pending → Successful",
        remarks: "Applicant returned with docs",
    },
];
