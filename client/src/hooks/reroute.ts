import { useNavigate } from "react-router";

export const ParentRouteClasses = {
    profile: "/profile",
    endshift: "/end-shift",
    history: "/history",
    historyEdit: "/history/:userId/edit",
} as const;

export type RouteVariants = keyof typeof ParentRouteClasses;

export function useNavigateDefault() {
    const navigate = useNavigate();
    return (route: RouteVariants) => {
        navigate(ParentRouteClasses[route]);
    };
}
