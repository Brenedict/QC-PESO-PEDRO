// General Imports
import React, {
    Children,
    useEffect,
    useState,
    type ChangeEvent,
    type MouseEventHandler,
    type ReactNode,
    type SubmitEvent,
} from "react";
import { Form } from "react-router";

// Components
import Button from "./Button";
import { Card } from "./Card";
import { SearchInput } from "./Input";
import { Text } from "./Text";
import Icon from "./Icon";
import EmptyData from "./EmptyData";

// Material UI Icons
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

// Contexts
import { TableProvider, useTable, type TableContextValue } from "../context/TableContext";

// Custom Hooks
import useSearchParamsTable from "../hooks/useSearchParamsTable";

function Row({ children }: { children: ReactNode }) {
    return <tr>{children}</tr>;
}

function Header({ text, nowrap }: { text: string; nowrap?: boolean }) {
    return (
        <th
            className={`${nowrap ? "whitespace-nowrap" : ""} px-16 py-4 border-0 border-b border-y-off-white-border uppercase bg-off-white`}
        >
            <Text size="small" weight="bold" align="center" variant="grayish-blue">
                {text}
            </Text>
        </th>
    );
}

function Data({ children, nowrap }: { children: ReactNode; nowrap?: boolean }) {
    return (
        <td
            className={`${nowrap ? "whitespace-nowrap" : ""} py-4 border-0 border-b border-y-off-white-border bg-white align-middle text-center text-small-description`}
        >
            <div className="flex justify-center px-4 gap-2">{children}</div>
        </td>
    );
}
function PaginationButtons({
    highlighted = false,
    children,
    onClick,
}: {
    highlighted?: boolean;
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <Button
            variant={highlighted ? "blue" : "white"}
            size="small"
            className="min-w-0! p-1! aspect-square h-9 w-auto transition-colors"
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

function FilterSection() {
    const { searchParams, setSearchParams } = useSearchParamsTable();
    const { filterView, extraFilters, isExternalFilterChanged } = useTable();
    const [isChanged, setIsChanged] = useState(false);

    if (!filterView) return null;

    const externalFilterChanged = isExternalFilterChanged?.() ?? false;
    const hasChanges = isChanged || externalFilterChanged;

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const params = Object.fromEntries(formData);

        setSearchParams({
            ...params,
            page: 1,
        });

        setIsChanged(false);
    };

    const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);

        const currentParams = Object.fromEntries(formData) as Record<string, string>;

        const changed = Object.entries(currentParams).some(([key, value]) => {
            const searchValue = (searchParams as Record<string, string | undefined>)[key] ?? "";

            return value !== searchValue;
        });

        setIsChanged(changed);
    };

    return (
        <Card.Header variant="white">
            <Form
                method="POST"
                className="flex justify-between items-center w-full"
                onSubmit={handleSubmit}
                onChange={handleChange}
                id="tableFilter"
            >
                <div className="flex items-center gap-4 grow">
                    <SearchInput
                        name="search"
                        placeholder="Search by keywords..."
                        className="rounded-xl w-full"
                        defaultValue={searchParams.search ?? ""}
                    />

                    {extraFilters}
                </div>

                <Button
                    size="normal"
                    className="min-w-60! ml-20 text-description"
                    variant="navy"
                    leftIcon={{
                        icon: FilterAltOutlinedIcon,
                        variant: "white",
                        size: "bigMedium",
                    }}
                    type="submit"
                    disabled={!hasChanges}
                >
                    Apply Filters
                </Button>
            </Form>
        </Card.Header>
    );
}

interface PaginationSectionProps {
    pageNumbers: number;
    paginationText: string;
    windowSize?: number; // optional, default 5
}

function PaginationSection({ pageNumbers, paginationText, windowSize = 5 }: PaginationSectionProps) {
    const { pageKey } = useTable();
    const { page, handleSetPage } = useSearchParamsTable({}, pageKey);
    const { pagination } = useTable();

    if (!pagination) return null;

    const halfWindow = Math.floor(windowSize / 2);

    // Sliding window for page numbers
    const windowStart = Math.max(1, Math.min(page - halfWindow, pageNumbers - windowSize + 1));
    const windowEnd = Math.min(pageNumbers, windowStart + windowSize - 1);
    const visiblePages = Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => windowStart + i);

    return (
        <Card.Footer variant="off-white" className="flex justify-between">
            <Text variant="grayish-blue" size="description" weight="normal" align="left">
                {paginationText}
            </Text>

            <div className="flex gap-1 justify-end">
                {pageNumbers > 1 && page !== 1 && (
                    <PaginationButtons onClick={handleSetPage(page - 1)}>
                        <Icon size="big" variant="grayish-blue" icon={KeyboardArrowLeftOutlinedIcon} />
                    </PaginationButtons>
                )}

                {visiblePages.length > 1 &&
                    visiblePages.map((pageNum) => (
                        <PaginationButtons
                            key={pageNum}
                            onClick={handleSetPage(pageNum)}
                            highlighted={page === pageNum}
                        >
                            {pageNum}
                        </PaginationButtons>
                    ))}

                {pageNumbers > 1 && page !== pageNumbers && (
                    <PaginationButtons onClick={handleSetPage(page + 1)}>
                        <Icon size="big" variant="grayish-blue" icon={KeyboardArrowRightOutlinedIcon} />
                    </PaginationButtons>
                )}
            </div>
        </Card.Footer>
    );
}

interface TableProps extends TableContextValue {
    items?: number;
    children: ReactNode;
}

function Table({ children, items = 10, ...tableContext }: TableProps) {
    // Pagination hook
    const { page, setSearchParams } = useSearchParamsTable({}, tableContext.pageKey);

    const childrenArray = Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Row
    );
    const header = childrenArray[0];
    const rows = childrenArray.slice(1);

    let viewRows = rows;
    let paginationSection: ReactNode = null;

    // Limit page from range 1 to pageNumbers
    const pageNumbers = Math.ceil(rows.length / items);
    const clampedPage = Math.min(Math.max(page, 1), Math.max(pageNumbers, 1));

    // Runs when page changes
    useEffect(() => {
        if (page !== clampedPage) {
            setSearchParams({
                [tableContext.pageKey ?? "page"]: clampedPage,
            });
        }
    }, [page, clampedPage, setSearchParams, tableContext.pageKey]);

    if (tableContext.pagination) {
        const start = (clampedPage - 1) * items;
        const end = clampedPage * items;

        viewRows = rows.slice(start, end);

        const lastIndex = Math.min(end, rows.length);

        const paginationText = `Showing ${
            viewRows.length > 0 ? `${start + 1} to ${lastIndex}` : "0"
        } out of ${rows.length}`;

        paginationSection = <PaginationSection pageNumbers={pageNumbers} paginationText={paginationText} />;
    }

    return (
        <TableProvider value={tableContext}>
            <Card
                {...(tableContext.noCardStyle && {
                    dropShadow: false,
                    className: "rounded-none! border-0!",
                })}
            >
                {/* Header */}
                <FilterSection />

                {/* Body */}
                <Card.Body className="p-0! overflow-auto">
                    <table className="table-auto w-full">
                        <thead>{header}</thead>

                        <tbody>
                            {viewRows.length <= 0 ? (
                                <tr>
                                    <td colSpan={9999} className="p-20">
                                        <div className="flex justify-center">
                                            <EmptyData>No data to show here!</EmptyData>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                viewRows
                            )}
                        </tbody>
                    </table>
                </Card.Body>

                {/* Footer */}
                {paginationSection}
            </Card>
        </TableProvider>
    );
}

export default Object.assign(Table, { Row, Header, Data });
