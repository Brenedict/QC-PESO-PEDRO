import React, { createContext } from "react";
import type { StatusVariant } from "../components/Status";
import type { Role } from "../types/common";

export interface TopBarContextValue {
    status: StatusVariant<"status">;
    hasNotif: boolean;
    firstName: string;
    lastName: string;
    profilePicUrl?: string;
    role: Role;
    onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
    onNotifClick: React.MouseEventHandler<HTMLButtonElement>;
}

// This shouldn't be here anymore
const TopBarContext = createContext<TopBarContextValue>({
    status: "ONLINE",
    hasNotif: false,
    firstName: "",
    lastName: "",
    profilePicUrl: "",
    role: "FRONTLINE",
    onSearchChange: () => {},
    onNotifClick: () => {},
});

export default TopBarContext;
