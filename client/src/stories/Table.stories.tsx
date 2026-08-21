import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Table from "../components/Table";
import Status from "../components/Status";
import { Text } from "../components/Text";

import "../index.css";
import { createMemoryRouter, RouterProvider } from "react-router";
import Button from "../components/Button";
import applicants from "../data/applicants";

const meta = {
    title: "Table",
    component: Table,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [
        (Story) => {
            const router = createMemoryRouter(
                [
                    {
                        path: "/",
                        element: <Story />,
                        action: fn(),
                    },
                ],
                { initialEntries: ["/"] }
            );

            return <RouterProvider router={router} />;
        },
    ],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TableFullView: Story = {
    args: {
        children: "",
        pagination: true,
        filterView: true,
    },
    parameters: {
        docs: {
            description: {
                story: "A table with a search/filter header, a paginated body, and pagination footer.",
            },
        },
    },
    render: (args) => (
        <Table pagination={args.pagination} filterView={args.filterView}>
            {/* Header row */}
            <Table.Row>
                <Table.Header text="ID" />
                <Table.Header text="Name" />
                <Table.Header text="Position" />
                <Table.Header text="Status" />
                <Table.Header text="Date Applied" />
                <Table.Header text="Action" />
            </Table.Row>

            {/* Data rows */}
            {applicants.map((applicant) => (
                <Table.Row key={applicant.id}>
                    <Table.Data>
                        <Text font="consolas" size="small" variant="grayish-blue" align="center">
                            {applicant.id}
                        </Text>
                    </Table.Data>
                    <Table.Data>{applicant.name}</Table.Data>
                    <Table.Data>{applicant.position}</Table.Data>
                    <Table.Data>
                        <Status type="verification" variant={applicant.status}></Status>
                    </Table.Data>
                    <Table.Data>{applicant.dateApplied}</Table.Data>
                    <Table.Data>
                        <Button variant="white-black" size="tiny">
                            Edit
                        </Button>
                        <Button variant="white-red" size="tiny">
                            Delete
                        </Button>
                    </Table.Data>
                </Table.Row>
            ))}
        </Table>
    ),
};

export const TablePaginationOnly: Story = {
    args: {
        children: "",
        pagination: true,
    },
    parameters: {
        docs: {
            description: {
                story: "A table with only a paginated body and footer with no filter header.",
            },
        },
    },
    render: (args) => (
        <Table pagination={args.pagination}>
            {/* Header row */}
            <Table.Row>
                <Table.Header text="ID" />
                <Table.Header text="Name" />
                <Table.Header text="Position" />
                <Table.Header text="Status" />
                <Table.Header text="Date Applied" />
                <Table.Header text="Action" />
            </Table.Row>

            {/* Data rows */}
            {applicants.map((applicant) => (
                <Table.Row key={applicant.id}>
                    <Table.Data>
                        <Text font="consolas" size="small" variant="grayish-blue" align="center">
                            {applicant.id}
                        </Text>
                    </Table.Data>
                    <Table.Data>{applicant.name}</Table.Data>
                    <Table.Data>{applicant.position}</Table.Data>
                    <Table.Data>
                        <Status type="verification" variant={applicant.status}></Status>
                    </Table.Data>
                    <Table.Data>{applicant.dateApplied}</Table.Data>
                    <Table.Data>
                        <Button variant="white-black" size="tiny">
                            Edit
                        </Button>
                        <Button variant="white-red" size="tiny">
                            Delete
                        </Button>
                    </Table.Data>
                </Table.Row>
            ))}
        </Table>
    ),
};

export const TableFilterOnly: Story = {
    args: {
        children: "",
        filterView: true,
    },
    parameters: {
        docs: {
            description: {
                story: "A table with only a search/filter header with no pagination.",
            },
        },
    },
    render: (args) => (
        <Table pagination={args.pagination} filterView={args.filterView}>
            {/* Header row */}
            <Table.Row>
                <Table.Header text="ID" />
                <Table.Header text="Name" />
                <Table.Header text="Position" />
                <Table.Header text="Status" />
                <Table.Header text="Date Applied" />
                <Table.Header text="Action" />
            </Table.Row>

            {/* Data rows */}
            {applicants.map((applicant) => (
                <Table.Row key={applicant.id}>
                    <Table.Data>
                        <Text font="consolas" size="small" variant="grayish-blue" align="center">
                            {applicant.id}
                        </Text>
                    </Table.Data>
                    <Table.Data>{applicant.name}</Table.Data>
                    <Table.Data>{applicant.position}</Table.Data>
                    <Table.Data>
                        <Status type="verification" variant={applicant.status}></Status>
                    </Table.Data>
                    <Table.Data>{applicant.dateApplied}</Table.Data>
                    <Table.Data>
                        <Button variant="white-black" size="tiny">
                            Edit
                        </Button>
                        <Button variant="white-red" size="tiny">
                            Delete
                        </Button>
                    </Table.Data>
                </Table.Row>
            ))}
        </Table>
    ),
};

export const TableBase: Story = {
    args: {
        children: "",
    },
    parameters: {
        docs: {
            description: {
                story: "A plain table body with no header and no pagination.",
            },
        },
    },
    render: (args) => (
        <Table pagination={args.pagination}>
            {/* Header row */}
            <Table.Row>
                <Table.Header text="ID" />
                <Table.Header text="Name" />
                <Table.Header text="Position" />
                <Table.Header text="Status" />
                <Table.Header text="Date Applied" />
                <Table.Header text="Action" />
            </Table.Row>

            {/* Data rows */}
            {applicants.map((applicant) => (
                <Table.Row key={applicant.id}>
                    <Table.Data>
                        <Text font="consolas" size="small" variant="grayish-blue" align="center">
                            {applicant.id}
                        </Text>
                    </Table.Data>
                    <Table.Data>{applicant.name}</Table.Data>
                    <Table.Data>{applicant.position}</Table.Data>
                    <Table.Data>
                        <Status type="verification" variant={applicant.status}></Status>
                    </Table.Data>
                    <Table.Data>{applicant.dateApplied}</Table.Data>
                    <Table.Data>
                        <Button variant="white-black" size="tiny">
                            Edit
                        </Button>
                        <Button variant="white-red" size="tiny">
                            Delete
                        </Button>
                    </Table.Data>
                </Table.Row>
            ))}
        </Table>
    ),
};

export const TableEmpty: Story = {
    args: {
        children: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Fallback message shown when the table is empty",
            },
        },
    },
    render: (args) => (
        <Table pagination={args.pagination}>
            {/* Header row */}
            <Table.Row>
                <Table.Header text="ID" />
                <Table.Header text="Name" />
                <Table.Header text="Position" />
                <Table.Header text="Status" />
                <Table.Header text="Date Applied" />
                <Table.Header text="Action" />
            </Table.Row>
        </Table>
    ),
};
