import { useLocation, useNavigate } from "react-router";
import { encode } from "../utils/hashids";

const BASE_ROUTES = {
    auth: "/auth",
    dashboard: "/",
    profile: "/profile",
    history: "/history",
    applicantForm: "/applicant-form",
    endshift: "/end-shift",
    monitoring: "/monitoring",
    reports: "/reports",
    auditLogs: "/audit-logs",
    userManagement: "/user-management",
    contextAnalysis: "/context-analysis",
};

export const ROUTES = {
    /* 
    Di pa kasama here ang mga filter/search, i think if kaunti lang naman ang filter di na worth na query sya. 
    At the time I'm writing this, if may hindi tama here pa-edit nalang.
    */
    auth: {
        root: BASE_ROUTES.auth,
    },
    dashboard: {
        root: BASE_ROUTES.dashboard,
        preview: (type: string) => `${BASE_ROUTES.dashboard}/${type}`,
    },
    profile: {
        root: BASE_ROUTES.profile,
    },
    history: {
        root: BASE_ROUTES.history,
        edit: (transactionId: string | number) => `${BASE_ROUTES.history}/${encode(transactionId)}/edit`,
        delete: (transactionId: string | number) => `${BASE_ROUTES.history}/${encode(transactionId)}/delete`,
        view: (transactionId: string | number) => `${BASE_ROUTES.history}/${encode(transactionId)}/view`,
    },
    applicantForm: {
        root: BASE_ROUTES.applicantForm,
        edit: (transactionId: string | number) => `${BASE_ROUTES.applicantForm}/${encode(transactionId)}/edit`,
        delete: (transactionId: string | number) => `${BASE_ROUTES.applicantForm}/${encode(transactionId)}/delete`,
        view: (transactionId: string | number) => `${BASE_ROUTES.applicantForm}/${encode(transactionId)}/view`,
    },
    endshift: {
        root: BASE_ROUTES.endshift,
        review: (shiftId: string | number) => `${BASE_ROUTES.endshift}/${encode(shiftId)}/review`,
    },
    monitoring: {
        root: BASE_ROUTES.monitoring,
        view: (shiftId: string | number) => `${BASE_ROUTES.monitoring}/${encode(shiftId)}/view-history`,
    },
    reports: {
        root: BASE_ROUTES.reports,
        view: (to: string, from: string) => `${BASE_ROUTES.reports}/transaction-summary/${from}-${to}`,
        preview: (type: string) => `${BASE_ROUTES.reports}/${type}`,
    },
    auditLogs: {
        root: BASE_ROUTES.auditLogs,
    },
    userManagement: {
        root: BASE_ROUTES.userManagement,
        create: `${BASE_ROUTES.userManagement}/create`,
        edit: (userId: string | number) => `${BASE_ROUTES.userManagement}/${encode(userId)}/edit`,
        reset: (userId: string | number) => `${BASE_ROUTES.userManagement}/${encode(userId)}/reset`,
        manage: (userId: string | number) => `${BASE_ROUTES.userManagement}/${encode(userId)}/manage`,
        promote: (userId: string | number) => `${BASE_ROUTES.userManagement}/${encode(userId)}/promote`,
        demote: (userId: string | number) => `${BASE_ROUTES.userManagement}/${encode(userId)}/demote`,
    },
    contextAnalysis: {
        root: BASE_ROUTES.contextAnalysis,
    },
} as const;

export type transactionRootPage = "history" | "entry";

export function useNavigateDefault() {
    const navigate = useNavigate();
    const location = useLocation();

    return (route: string, keepQuery = false) => {
        if (keepQuery && location.search) {
            route = `${route}${location.search}`;
        }
        navigate(route, { state: { backgroundLocation: location } });
    };
}
