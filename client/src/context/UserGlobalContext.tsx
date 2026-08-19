import type { Role } from "@qcpesopedro/shared/prisma/enums";
import { createContext, useContext, type ReactNode } from "react";

export interface UserGlobalContextValue {
    id: number;
    status: "DISABLED" | "ONLINE" | "OFFLINE" | "LOGGED_OUT";
    hasNotif: boolean;
    firstName: string;
    lastName: string;
    role: Role;
    onSearchChange: () => void;
    onNotifClick: () => void;
}

export const UserGlobalContext = createContext<UserGlobalContextValue | null>(null);

export function UserGlobalProvider({ value, children }: { value: UserGlobalContextValue; children: ReactNode }) {
    return <UserGlobalContext value={value}>{children}</UserGlobalContext>;
}

export function useUserGlobal() {
    const context = useContext(UserGlobalContext);

    if (!context) {
        throw new Error("useUserGlobal must be used inside UserGlobalProvider");
    }

    return context;
}
