import { createContext, useContext, type MouseEventHandler, type ReactNode } from "react";

export interface TableContextValue {
    pagination?: {
        items: number;
        currentPage: number;
        handleSetPage: (page: number) => MouseEventHandler<HTMLButtonElement>;
    };
    filterView?: boolean;
    extraFilters?: ReactNode;
    noCardStyle?: boolean;
}

export const TableContext = createContext<TableContextValue | null>(null);

export function TableProvider({ value, children }: { value: TableContextValue; children: ReactNode }) {
    return <TableContext value={value}>{children}</TableContext>;
}

export function useTable() {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error("useTable must be used inside TableProvider");
    }

    return context;
}
