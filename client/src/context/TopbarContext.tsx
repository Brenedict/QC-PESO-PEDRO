import type { Role } from "@qcpesopedro/shared/prisma/browser";
import { createContext, useContext, type ReactNode } from "react";
import type { StatusVariant } from "../components/Status";

export interface TopBarContextValue {
    id: number;
    status: StatusVariant<"status">;
    hasNotif: boolean;
    firstName: string;
    lastName: string;
    role: Role;
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
