import { type TopBarContextValue } from "../context/TopbarContext";

//Temporary lang (naaisip ko nakacontext to once na may backend na tayo)
export const userContext: TopBarContextValue = {
    status: "online",
    userFullName: "Kenneth Pabillo",
    hasNotif: false,
    roleType: "admin",
    onSearchChange: () => {},
    onNotifClick: () => {},
};
