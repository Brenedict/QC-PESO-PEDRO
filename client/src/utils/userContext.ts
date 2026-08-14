import { type TopBarContextValue } from "../context/TopbarContext";

//Temporary lang (naaisip ko nakacontext to once na may backend na tayo)
export const userContext: TopBarContextValue = {
    status: "ONLINE",
    firstName: "Kenneth Pabillo",
    lastName: "",
    hasNotif: false,
    role: "ADMIN",
    onSearchChange: () => {},
    onNotifClick: () => {},
};
