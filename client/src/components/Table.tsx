import Button from "./Button";
import { Card } from "./Card";
import { SearchInput } from "./Input";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Text } from "./Text";
import { Children, useState, type MouseEventHandler, type ReactNode, type SubmitEventHandler } from "react";
import Icon from "./Icon";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Form } from "react-router";

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

interface FilterProps {
    children: ReactNode;
    onSubmit?: SubmitEventHandler<HTMLFormElement>;
}

function FilterSection({ children, onSubmit }: FilterProps) {
    return (
        <Card.Header variant="white">
            <Form method="POST" className="flex justify-between items-center w-full" onSubmit={onSubmit}>
                <div className="flex items-center gap-4">
                    <SearchInput
                        placeholder="Search by applicant, ID, or keywords..."
                        className="rounded-xl min-w-100"
                    />
                    {children}
                </div>
                <Button
                    size="normal"
                    className="min-w-60! ml-20 text-description"
                    variant="navy"
                    leftIcon={{ icon: FilterAltOutlinedIcon, variant: "white", size: "bigMedium" }}
                >
                    Apply Filters
                </Button>
            </Form>
        </Card.Header>
    );
}

interface PaginationProps {
    currentPage: number;
    pageNumbers: number;
    paginationText: string;
    handleSetPage: (page: number) => MouseEventHandler<HTMLButtonElement>;
    windowSize?: number; // optional, default 3
}

function PaginationSection({
    currentPage,
    pageNumbers,
    handleSetPage,
    paginationText,
    windowSize = 5,
}: PaginationProps) {
    // Sliding window for page numbers
    const maxStart = Math.max(0, pageNumbers - windowSize);
    const windowStart = Math.max(0, Math.min(currentPage - (windowSize - 1), maxStart));

    const visiblePages = Array.from(
        { length: Math.min(windowSize, pageNumbers) },
        (_, i) => windowStart + i + 1 // 1-indexed
    );

    return (
        <Card.Footer variant="off-white" className="flex justify-between">
            <Text variant="grayish-blue" size="description" weight="normal" align="left">
                {paginationText}
            </Text>
            <div className="flex gap-1 justify-end">
                {pageNumbers > 1 && currentPage !== 1 && (
                    <PaginationButtons onClick={handleSetPage(currentPage - 1)}>
                        <Icon size="big" variant="grayish-blue" icon={KeyboardArrowLeftOutlinedIcon} />
                    </PaginationButtons>
                )}

                {visiblePages.map((pageNum) => (
                    <PaginationButtons
                        onClick={handleSetPage(pageNum)}
                        highlighted={currentPage === pageNum}
                        key={pageNum}
                    >
                        {pageNum}
                    </PaginationButtons>
                ))}

                {pageNumbers > 1 && currentPage !== pageNumbers && (
                    <PaginationButtons onClick={handleSetPage(currentPage + 1)}>
                        <Icon size="big" variant="grayish-blue" icon={KeyboardArrowRightOutlinedIcon} />
                    </PaginationButtons>
                )}
            </div>
        </Card.Footer>
    );
}

interface TableProps {
    children: ReactNode;
    onFilterSubmit?: SubmitEventHandler<HTMLFormElement>;
    extraFilters?: ReactNode;
    pagination?: number;
}

function Table({ extraFilters, onFilterSubmit, children, pagination }: TableProps) {
    const [page, setPage] = useState<number>(1);

    let paginationSection = null;
    const header = Children.toArray(children)[0];
    let viewRows = Children.toArray(children).slice(1);

    if (pagination) {
        const handleSetPage =
            (page: number): MouseEventHandler<HTMLButtonElement> =>
            () =>
                setPage(page);

        const [start, end] = [(page - 1) * pagination, page * pagination];

        const childrenArr = Children.toArray(children).slice(1);
        viewRows = childrenArr.slice(start, end);

        const lastIndex = Math.min(end, childrenArr.length);
        const paginationText = `Showing ${viewRows.length > 0 ? `${start + 1} to ${lastIndex}` : "0"} out of ${childrenArr.length}`;
        const pageNumbers = Math.ceil(childrenArr.length / pagination);

        paginationSection = (
            <PaginationSection {...{ paginationText, handleSetPage, currentPage: page, pageNumbers }} />
        );
    }

    return (
        <Card>
            {/* Header */}
            {onFilterSubmit && <FilterSection onSubmit={onFilterSubmit}>{extraFilters}</FilterSection>}

            {/* Body */}
            <Card.Body className={`p-0!  `}>
                <table className="table-auto w-full">
                    <thead>{header}</thead>
                    <tbody>
                        {viewRows.length <= 0 ? (
                            <tr>
                                <td colSpan={9999} className="p-20">
                                    <Text size="big" variant="grayish-blue" align="center" weight="bold">
                                        No data to show here!
                                    </Text>
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
    );
}

export default Object.assign(Table, { Row, Header, Data });
