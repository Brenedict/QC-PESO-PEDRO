import React, { createContext } from "react";
import type { StatusVariant } from "../components/Status";
import type { Role } from "../types/common";

export interface TopBarContextValue {
    status: StatusVariant<"connection">;
    hasNotif: boolean;
    userFullName: string;
    profilePicUrl?: string;
    roleType: Role;
    onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
    onNotifClick: React.MouseEventHandler<HTMLButtonElement>;
}

const TopBarContext = createContext<TopBarContextValue>({
    status: "online",
    hasNotif: false,
    userFullName: "",
    profilePicUrl: "",
    roleType: "frontline",
    onSearchChange: () => {},
    onNotifClick: () => {},
});

export default TopBarContext;
