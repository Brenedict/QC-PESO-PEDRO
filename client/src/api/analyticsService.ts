// General Imports
import type { ActionFunctionArgs } from "react-router";

// API Services
import { getOverviewAnalytics, getRecentTransactions } from "../api/transactionService";

export const getAnalytics = async (args: ActionFunctionArgs) => {
    const analytics = await getOverviewAnalytics(args);
    const recent = await getRecentTransactions(args);
    return { analytics, recent };
};
