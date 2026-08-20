import { useMatches } from "react-router";
import { AccessLevel } from "@qcpesopedro/shared/accessLevel";

export type RouteHandle = {
    minAccessLevel?: AccessLevel;
};

export function useAccessLevel() {
    const matches = useMatches();

    // Retrieves the `minAccessLevel` handle from the current branch (where this hook is called from)
    const route = [...matches].reverse().find((match) => (match.handle as RouteHandle)?.minAccessLevel !== undefined);

    const minAccessLevel = (route?.handle as RouteHandle | undefined)?.minAccessLevel;

    return {
        minAccessLevel,
    };
}
