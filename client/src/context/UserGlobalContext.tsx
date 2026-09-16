// General Imports
import { createContext, useContext, type ReactNode } from "react";

// PEDRO SHARED IMPORTS
import type { Role, Shift, Status } from "@qcpesopedro/shared/prisma/enums";

export interface UserGlobalContextValue {
    id: number;
    email: string;
    shift: Shift;
    status: Status;
    firstName: string;
    lastName: string;
    role: Role;
    onSearchChange: () => void;
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
