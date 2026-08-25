// General Imports
import { useSearchParams, type SetURLSearchParams } from "react-router";
import type { MouseEventHandler } from "react";

type SearchParamsType = Record<string, string | number>;
type SetSearchParamsType = (params: Record<string, string | number>) => void;

interface TableHookReturn {
    page: number;
    handleSetPage: (page: number) => MouseEventHandler<HTMLButtonElement>;
    searchParams: SearchParamsType;
    setSearchParams: SetSearchParamsType;
}

// Setter for a single param that preserves other params. Allows customizing the page key used for pagination defaults.
function createParamSetter(setSearchParams: SetURLSearchParams, pageKey: string = "page") {
    return (params: SearchParamsType) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);

            for (const [key, value] of Object.entries(params)) {
                const stringValue = value?.toString() ?? "";

                const isDefault =
                    (key === pageKey && stringValue === "1") ||
                    (key === "timeframe" && stringValue !== "overall") ||
                    stringValue.trim() === "";

                if (isDefault) {
                    next.delete(key);
                } else {
                    next.set(key, stringValue);
                }
            }

            return next;
        });
    };
}

// --- Main Hook ---

// Pinagsama ko na pala dito both search tiyaka page para isahang hook nalang
// Since connected rin naman sila
export function useSearchParamsTable(defaultExtraParams?: SearchParamsType, pageKey: string = "page"): TableHookReturn {
    const [searchParams, setSearchParams] = useSearchParams(
        Object.fromEntries(Object.entries({ ...defaultExtraParams, [pageKey]: "1" }).map(([k, v]) => [k, String(v)]))
    );
    const page = Number(searchParams.get(pageKey)) || 1;

    const searchParamsObj: SearchParamsType = Object.fromEntries(searchParams.entries());

    // Manual setting of search searchParams (para sa other functions nung table)
    // e.g. setSearchParam("search": "Hellooooo")
    const setSearchParamsFn = createParamSetter(setSearchParams, pageKey);

    // Set page for table using query ?page=something
    const handleSetPage = (newPage: number) => () => setSearchParamsFn({ [pageKey]: newPage });

    return {
        page,
        handleSetPage,
        searchParams: searchParamsObj,
        setSearchParams: setSearchParamsFn,
    };
}
