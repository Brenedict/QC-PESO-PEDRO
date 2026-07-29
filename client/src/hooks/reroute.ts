import { useNavigate } from "react-router";

const BASE_ROUTES = {
    dashboard: "/",
    profile: "/profile",
    history: "/history",
    applicantForm: "/applicant-form",
    endshift: "/end-shift",
    monitoring: "/monitoring",
    reports: "/reports",
    auditLogs: "/audit-logs",
    userManagement: "/user-management",
};

export const ROUTES = {
    /* 
    Di pa kasama here ang mga filter/search, i think if kaunti lang naman ang filter di na worth na query sya. 
    At the time I'm writing this, if may hindi tama here pa-edit nalang.
    */
    dashboard: {
        root: BASE_ROUTES.dashboard,
    },
    profile: {
        root: BASE_ROUTES.profile,
    },
    history: {
        root: BASE_ROUTES.history,
        edit: (transactionId: string | number) => `${BASE_ROUTES.history}/${transactionId}/edit`,
        delete: (transactionId: string | number) => `${BASE_ROUTES.history}/${transactionId}/delete`,
        view: (transactionId: string | number) => `${BASE_ROUTES.history}/${transactionId}/view`,
    },
    applicantForm: {
        root: BASE_ROUTES.applicantForm,
        edit: (userId: string | number) => `${BASE_ROUTES.applicantForm}/${userId}/edit`,
        delete: (userId: string | number) => `${BASE_ROUTES.applicantForm}/${userId}/delete`,
        view: (userId: string | number) => `${BASE_ROUTES.applicantForm}/${userId}/view`,
    },
    endshift: {
        root: BASE_ROUTES.endshift,
        review: (shiftId: string | number) => `${BASE_ROUTES.endshift}/${shiftId}/review`,
    },
    monitoring: {
        root: BASE_ROUTES.monitoring,
        view: (shiftId: string | number) => `${BASE_ROUTES.monitoring}/${shiftId}/view-history`,
    },
    reports: {
        root: BASE_ROUTES.reports,
        view: (to: string, from: string) => `${BASE_ROUTES.reports}/transaction-summary/${from}-${to}`,
    },
    auditLogs: {
        root: BASE_ROUTES.auditLogs,
    },
    userManagement: {
        root: BASE_ROUTES.userManagement,
        create: `${BASE_ROUTES.userManagement}/create`,
        reset: (userId: string | number) => `${BASE_ROUTES.userManagement}/${userId}/reset`,
        disable: (userId: string | number) => `${BASE_ROUTES.userManagement}/${userId}/disable`,
        promote: (userId: string | number) => `${BASE_ROUTES.userManagement}/${userId}/promote`,
    },
} as const;

export function useNavigateDefault() {
    const navigate = useNavigate();
    return (route: string) => {
        navigate(route);
    };
}
