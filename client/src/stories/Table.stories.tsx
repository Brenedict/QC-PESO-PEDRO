import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Table from "../components/Table";
import "../index.css";
import { createMemoryRouter, RouterProvider } from "react-router";

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

// ---- Dummy data: 35 applicants (yields 6 pages at limit = 6) ----
type Applicant = {
    id: string;
    name: string;
    position: string;
    status: "Pending" | "Approved" | "Rejected" | "Under Review";
    dateApplied: string;
};

const applicants: Applicant[] = [
    {
        id: "APP-0001",
        name: "Juan Dela Cruz",
        position: "Software Engineer",
        status: "Approved",
        dateApplied: "2026-01-04",
    },
    { id: "APP-0002", name: "Maria Santos", position: "UI/UX Designer", status: "Pending", dateApplied: "2026-01-07" },
    {
        id: "APP-0003",
        name: "Pedro Reyes",
        position: "Data Analyst",
        status: "Under Review",
        dateApplied: "2026-01-09",
    },
    {
        id: "APP-0004",
        name: "Ana Bautista",
        position: "Project Manager",
        status: "Approved",
        dateApplied: "2026-01-11",
    },
    { id: "APP-0005", name: "Jose Mendoza", position: "QA Engineer", status: "Rejected", dateApplied: "2026-01-13" },
    { id: "APP-0006", name: "Liza Garcia", position: "DevOps Engineer", status: "Approved", dateApplied: "2026-01-15" },
    {
        id: "APP-0007",
        name: "Mark Villanueva",
        position: "Backend Developer",
        status: "Pending",
        dateApplied: "2026-01-18",
    },
    {
        id: "APP-0008",
        name: "Trisha Aquino",
        position: "Frontend Developer",
        status: "Under Review",
        dateApplied: "2026-01-20",
    },
    {
        id: "APP-0009",
        name: "Rico Tolentino",
        position: "Mobile Developer",
        status: "Approved",
        dateApplied: "2026-01-22",
    },
    { id: "APP-0010", name: "Jenny Ramos", position: "Product Owner", status: "Pending", dateApplied: "2026-01-24" },
    { id: "APP-0011", name: "Carlo Domingo", position: "System Admin", status: "Approved", dateApplied: "2026-01-26" },
    {
        id: "APP-0012",
        name: "Bea Soriano",
        position: "Business Analyst",
        status: "Rejected",
        dateApplied: "2026-01-28",
    },
    {
        id: "APP-0013",
        name: "Paolo Ignacio",
        position: "Security Engineer",
        status: "Under Review",
        dateApplied: "2026-02-01",
    },
    { id: "APP-0014", name: "Karen Marquez", position: "Scrum Master", status: "Approved", dateApplied: "2026-02-03" },
    {
        id: "APP-0015",
        name: "Diego Navarro",
        position: "Full-Stack Developer",
        status: "Pending",
        dateApplied: "2026-02-05",
    },
    {
        id: "APP-0016",
        name: "Sofia Castillo",
        position: "Data Scientist",
        status: "Approved",
        dateApplied: "2026-02-07",
    },
    { id: "APP-0017", name: "Miguel Flores", position: "Tech Lead", status: "Approved", dateApplied: "2026-02-09" },
    { id: "APP-0018", name: "Andrea Lim", position: "UX Researcher", status: "Pending", dateApplied: "2026-02-11" },
    {
        id: "APP-0019",
        name: "Ralph Pascual",
        position: "Cloud Architect",
        status: "Under Review",
        dateApplied: "2026-02-13",
    },
    {
        id: "APP-0020",
        name: "Tina Belmonte",
        position: "HR Coordinator",
        status: "Approved",
        dateApplied: "2026-02-15",
    },
    { id: "APP-0021", name: "Joshua Cabral", position: "Marketing Lead", status: "Pending", dateApplied: "2026-02-17" },
    {
        id: "APP-0022",
        name: "Camille Hernandez",
        position: "Content Strategist",
        status: "Rejected",
        dateApplied: "2026-02-19",
    },
    { id: "APP-0023", name: "Francis Ong", position: "AI Engineer", status: "Under Review", dateApplied: "2026-02-21" },
    { id: "APP-0024", name: "Denise Yu", position: "Customer Success", status: "Approved", dateApplied: "2026-02-23" },
    {
        id: "APP-0025",
        name: "Patrick Velasco",
        position: "Account Manager",
        status: "Pending",
        dateApplied: "2026-02-25",
    },
    { id: "APP-0026", name: "Ella Trinidad", position: "Recruiter", status: "Approved", dateApplied: "2026-02-27" },
    {
        id: "APP-0027",
        name: "Vincent Sy",
        position: "Sales Executive",
        status: "Under Review",
        dateApplied: "2026-03-01",
    },
    {
        id: "APP-0028",
        name: "Mika Rivera",
        position: "Graphic Designer",
        status: "Approved",
        dateApplied: "2026-03-03",
    },
    { id: "APP-0029", name: "Harold Cruz", position: "Network Engineer", status: "Pending", dateApplied: "2026-03-05" },
    {
        id: "APP-0030",
        name: "Lara Mercado",
        position: "Operations Manager",
        status: "Approved",
        dateApplied: "2026-03-07",
    },
    {
        id: "APP-0031",
        name: "Bryan Aquino",
        position: "Database Admin",
        status: "Under Review",
        dateApplied: "2026-03-09",
    },
    { id: "APP-0032", name: "Rina David", position: "Legal Counsel", status: "Approved", dateApplied: "2026-03-11" },
    { id: "APP-0033", name: "Sean Manalo", position: "Finance Analyst", status: "Pending", dateApplied: "2026-03-13" },
    {
        id: "APP-0034",
        name: "Tara Agoncillo",
        position: "Compliance Officer",
        status: "Rejected",
        dateApplied: "2026-03-15",
    },
    {
        id: "APP-0035",
        name: "Nico Buenaventura",
        position: "IT Support",
        status: "Approved",
        dateApplied: "2026-03-17",
    },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TableFullView: Story = {
    args: {
        children: "",
        onFilterSubmit: fn(),
        pagination: 6,
    },
    parameters: {
        docs: {
            description: {
                story: "A table with a search/filter header, a paginated body, and pagination footer.",
            },
        },
    },
    render: (args) => (
        <Table pagination={args.pagination} onFilterSubmit={args.onFilterSubmit}>
            {/* Header row */}
            <Table.Row>
                <Table.Header text="ID" />
                <Table.Header text="Name" />
                <Table.Header text="Position" />
                <Table.Header text="Status" />
                <Table.Header text="Date Applied" />
            </Table.Row>

            {/* Data rows */}
            {applicants.map((applicant) => (
                <Table.Row key={applicant.id}>
                    <Table.Data>{applicant.id}</Table.Data>
                    <Table.Data>{applicant.name}</Table.Data>
                    <Table.Data>{applicant.position}</Table.Data>
                    <Table.Data>{applicant.status}</Table.Data>
                    <Table.Data>{applicant.dateApplied}</Table.Data>
                </Table.Row>
            ))}
        </Table>
    ),
};

export const TablePaginationOnly: Story = {
    args: {
        children: "",
        pagination: 6,
    },
    parameters: {
        docs: {
            description: {
                story: "A table with only a paginated body and footer with no filter header.",
            },
        },
    },
    render: (args) => (
        <Table pagination={args.pagination} onFilterSubmit={args.onFilterSubmit}>
            {/* Header row */}
            <Table.Row>
                <Table.Header text="ID" />
                <Table.Header text="Name" />
                <Table.Header text="Position" />
                <Table.Header text="Status" />
                <Table.Header text="Date Applied" />
            </Table.Row>

            {/* Data rows */}
            {applicants.map((applicant) => (
                <Table.Row key={applicant.id}>
                    <Table.Data>{applicant.id}</Table.Data>
                    <Table.Data>{applicant.name}</Table.Data>
                    <Table.Data>{applicant.position}</Table.Data>
                    <Table.Data>{applicant.status}</Table.Data>
                    <Table.Data>{applicant.dateApplied}</Table.Data>
                </Table.Row>
            ))}
        </Table>
    ),
};

export const TableFilterOnly: Story = {
    args: {
        children: "",
        onFilterSubmit: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: "A table with only a search/filter header with no pagination.",
            },
        },
    },
    render: (args) => (
        <Table pagination={args.pagination} onFilterSubmit={args.onFilterSubmit}>
            {/* Header row */}
            <Table.Row>
                <Table.Header text="ID" />
                <Table.Header text="Name" />
                <Table.Header text="Position" />
                <Table.Header text="Status" />
                <Table.Header text="Date Applied" />
            </Table.Row>

            {/* Data rows */}
            {applicants.map((applicant) => (
                <Table.Row key={applicant.id}>
                    <Table.Data>{applicant.id}</Table.Data>
                    <Table.Data>{applicant.name}</Table.Data>
                    <Table.Data>{applicant.position}</Table.Data>
                    <Table.Data>{applicant.status}</Table.Data>
                    <Table.Data>{applicant.dateApplied}</Table.Data>
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
        <Table pagination={args.pagination} onFilterSubmit={args.onFilterSubmit}>
            {/* Header row */}
            <Table.Row>
                <Table.Header text="ID" />
                <Table.Header text="Name" />
                <Table.Header text="Position" />
                <Table.Header text="Status" />
                <Table.Header text="Date Applied" />
            </Table.Row>

            {/* Data rows */}
            {applicants.map((applicant) => (
                <Table.Row key={applicant.id}>
                    <Table.Data>{applicant.id}</Table.Data>
                    <Table.Data>{applicant.name}</Table.Data>
                    <Table.Data>{applicant.position}</Table.Data>
                    <Table.Data>{applicant.status}</Table.Data>
                    <Table.Data>{applicant.dateApplied}</Table.Data>
                </Table.Row>
            ))}
        </Table>
    ),
};
