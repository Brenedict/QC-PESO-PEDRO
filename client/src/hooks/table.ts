import type { MouseEventHandler } from "react";
import { useSearchParams, type SetURLSearchParams } from "react-router";

type SearchParamsType = Record<string, string>;

interface TableHookReturn {
    page: number;
    handleSetPage: (page: number) => MouseEventHandler<HTMLButtonElement>;
    handleFilterSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    handleFilterChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
    searchParams: SearchParamsType;
    setSearchParams: (key: string, value: string) => void;
}

// Setter for a single param that preserves other params
function createParamSetter(setSearchParams: SetURLSearchParams) {
    return (key: string, value: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set(key, value);
            return next;
        });
    };
}

// Handle form submit: merge FormData into existing params
function createFilterHandler(setSearchParams: SetURLSearchParams) {
    return (e: React.SubmitEvent<HTMLFormElement> | React.ChangeEvent<HTMLFormElement>) => {
        setSearchParams((prev) => {
            const formData = new FormData(e.currentTarget);
            const next = new URLSearchParams(prev);
            for (const [key, value] of formData.entries()) {
                next.set(key, value.toString());
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
    const handleSetPage = (newPage: number) => () => setSearchParamsFn("page", newPage.toString());

    const handleFilterSubmit = createFilterHandler(setSearchParams);
    const handleFilterChange = createFilterHandler(setSearchParams);

    return {
        page,
        handleSetPage,
        searchParams: searchParamsObj,
        setSearchParams: setSearchParamsFn,
        handleFilterSubmit,
        handleFilterChange,
    };
}
