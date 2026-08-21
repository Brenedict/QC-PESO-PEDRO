import type { MouseEventHandler } from "react";
import { useSearchParams, type SetURLSearchParams } from "react-router";

type SearchParamsType = Record<string, string | number>;
type SetSearchParamsType = (params: Record<string, string | number>) => void;

interface TableHookReturn {
    page: number;
    handleSetPage: (page: number) => MouseEventHandler<HTMLButtonElement>;
    searchParams: SearchParamsType;
    setSearchParams: SetSearchParamsType;
}

// Setter for a single param that preserves other params
function createParamSetter(setSearchParams: SetURLSearchParams) {
    return (params: SearchParamsType) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);

            for (const [key, value] of Object.entries(params)) {
                const stringValue = value?.toString() ?? "";

                const isDefault = (key === "page" && stringValue === "1") || stringValue.trim() === "";

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
export function useSearchParamsTable(defaultExtraParams?: SearchParamsType): TableHookReturn {
    const [searchParams, setSearchParams] = useSearchParams({ ...defaultExtraParams, page: "1" });
    const page = Number(searchParams.get("page")) || 1;

    const searchParamsObj: SearchParamsType = Object.fromEntries(searchParams.entries());

    // Manual setting of search searchParams (para sa other functions nung table)
    // e.g. setSearchParam("search": "Hellooooo")
    const setSearchParamsFn = createParamSetter(setSearchParams);

    // Set page for table using query ?page=something
    const handleSetPage = (newPage: number) => () => setSearchParamsFn({ page: newPage });

    return {
        page,
        handleSetPage,
        searchParams: searchParamsObj,
        setSearchParams: setSearchParamsFn,
    };
}
