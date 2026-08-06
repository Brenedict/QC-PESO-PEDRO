export interface EndShiftReviewData {
    employeeName: string;
    role: string;
    shift: string;
    date: string;
    totalTransactions: number;
    sources: Array<{ label: string; total: number; m: number; f: number }>;
    demographics: Array<{ label: string; total: number }>;
    outcomes: Array<{ label: string; total: number; highlight: boolean }>;
    environmentTags: string[];
    employeeRemarks: string;
}

export const mockShiftData: EndShiftReviewData = {
    employeeName: "Juan Cruz",
    role: "Frontline Encoder",
    shift: "Morning Shift",
    date: "July 17, 2026",
    totalTransactions: 148,
    sources: [
        { label: "Walk-ins", total: 42, m: 24, f: 18 },
        { label: "Online Referrals", total: 38, m: 20, f: 18 },
        { label: "In-house Referrals", total: 29, m: 13, f: 16 },
        { label: "Other Inquiries", total: 12, m: 7, f: 5 },
    ],
    demographics: [
        { label: "First Time Job Seekers", total: 31 },
        { label: "PWD", total: 5 },
        { label: "Senior Citizens", total: 8 },
    ],
    outcomes: [
        { label: "Successful Referrals", total: 96, highlight: false },
        { label: "Pending Applications", total: 34, highlight: false },
        { label: "Mismatched Skills", total: 18, highlight: true },
    ],
    environmentTags: ["Slow Internet", "Heavy Rain"],
    employeeRemarks: "Internet connectivity was unstable from 2PM-4PM causing slower processing.",
};
