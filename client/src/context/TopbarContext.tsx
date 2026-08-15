import { createContext, useContext, type ReactNode } from "react";

export interface TopBarContextValue {
    id: number;
    status: "DISABLED" | "ONLINE" | "OFFLINE" | "LOGGED_OUT";
    hasNotif: boolean;
    firstName: string;
    lastName: string;
    role: "SUPERADMIN" | "ADMIN" | "FRONTLINE";
    onSearchChange: () => void;
    onNotifClick: () => void;
}

export const TopBarContext = createContext<TopBarContextValue | null>(null);

export function TopBarProvider({ value, children }: { value: TopBarContextValue; children: ReactNode }) {
    return <TopBarContext value={value}>{children}</TopBarContext>;
}

export function useTopBar() {
    const context = useContext(TopBarContext);

    if (!context) {
        throw new Error("useTopBar must be used inside TopBarProvider");
    }

    return context;
}
