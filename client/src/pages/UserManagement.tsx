import { Outlet } from "react-router";

// General Imports
import React, { type SubmitEvent } from "react";

// Components
import PageHeader from "../components/PageHeader";
import { Card } from "../components/Card";
import { Text } from "../components/Text";
import Table from "../components/Table";
import Profile from "../components/Profile";
import Button from "../components/Button";
import { SelectInput } from "../components/Input";
import { ActionButtons, RoleBadge, type ActionTypes } from "../components/TableCells";
import Status from "../components/Status";

// Icons
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import RemoveModeratorOutlinedIcon from "@mui/icons-material/RemoveModeratorOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";

// Types
import type { Role } from "../types/common";

// Test Data
import type { UserRecord } from "../data/users";

// Hooks
import { useSearchParamsTable } from "../hooks/table";
import { ROUTES, useNavigateDefault } from "../hooks/reroute";
interface UserManagementProps {
    users: UserRecord[];
}

// Stat Card
function StatCard({ title, value }: { title: string; value: string | number }) {
    return (
        <Card className="w-full flex-1">
            <Card.Body className="p-6">
                <div className="mb-2">
                    <Text size="description" variant="grayish-blue" weight="semiBold">
                        {title}
                    </Text>
                </div>
                <Text size="giant" variant="dark-blue" weight="bold">
                    {value}
                </Text>
            </Card.Body>
        </Card>
    );
}

// User Cell
function UserCell({ name, email }: { name: string; email: string }) {
    return (
        <div className="flex items-center gap-3 w-full justify-start md:pl-5">
            <div className="shrink-0">
                <Profile size="small" userFullName={name} bg="grayish-blue-opaque" textColor="primary-blue" />
            </div>
            <div className="flex flex-col text-left">
                <Text size="description" weight="bold" variant="dark-blue">
                    {name}
                </Text>
                <Text size="small" weight="normal" variant="grayish-blue">
                    {email}
                </Text>
            </div>
        </div>
    );
}

// Promote and Demote Button Utils
type RoleButton = {
    icon: typeof RemoveModeratorOutlinedIcon | typeof ShieldOutlinedIcon;
    text: string;
    color: "black" | "blue";
    handleClick: (id: string) => () => void;
};

function UserManagement({ users }: UserManagementProps) {
    const { page, handleSetPage } = useSearchParamsTable();
    const navigate = useNavigateDefault();

    const handleFilterSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Filter applied in User Management");
    };

    const RoleButtonMap: Record<Role, RoleButton> = {
        admin: {
            icon: RemoveModeratorOutlinedIcon,
            text: "Demote",
            color: "black",
            handleClick: (id) => () => navigate(ROUTES.userManagement.demote(id), true),
        },
        frontline: {
            icon: ShieldOutlinedIcon,
            text: "Promote",
            color: "blue",
            handleClick: (id) => () => navigate(ROUTES.userManagement.promote(id), true),
        },
    };

    // Actions depende sa current role ng user
    const getRowActions = (role: Role): ActionTypes => [
        {
            ...RoleButtonMap[role],
        },
        {
            icon: EditOutlinedIcon,
            text: "Edit",
            color: "black",
            handleClick: (id) => () => navigate(ROUTES.userManagement.edit(id), true),
        },
        {
            icon: VpnKeyOutlinedIcon,
            text: "Reset",
            color: "black",
            handleClick: (id) => () => navigate(ROUTES.userManagement.reset(id), true),
        },
        {
            icon: PersonOffOutlinedIcon,
            text: "Disable",
            color: "red",
            handleClick: (id) => () => navigate(ROUTES.userManagement.disable(id), true),
        },
    ];

    // Added extraFilters for User Management
    const extraFilters = (
        <div className="flex gap-4 items-center">
            <SelectInput
                optionList={[
                    { content: "All Roles", value: "" },
                    { content: "Administrator", value: "admin" },
                    { content: "Frontline Encoder", value: "frontline" },
                ]}
                iconClassName="top-2! right-2!"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
            />
            <SelectInput
                optionList={[
                    { content: "All Statuses", value: "" },
                    { content: "Active", value: "active" },
                    { content: "Inactive", value: "inactive" },
                ]}
                iconClassName="top-2! right-2!"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
            />
        </div>
    );

    return (
        <div className="flex flex-col w-full">
            <PageHeader
                primaryText="User Management"
                secondaryText="Manage system access, roles, and employee accounts."
            >
                <Button
                    size="normal"
                    variant="blue"
                    leftIcon={{ icon: PersonAddOutlinedIcon, size: "medium", variant: "white" }}
                    onClick={() => navigate(ROUTES.userManagement.create)}
                >
                    Add User
                </Button>
            </PageHeader>

            <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
                <StatCard title="Total Users" value={24} />
                <StatCard title="Active Users" value={20} />
                <StatCard title="Inactive Users" value={4} />
                <StatCard title="Roles" value={2} />
            </div>

            <Table
                pagination={{ currentPage: page, handleSetPage, items: 5 }}
                handleFilterSubmit={handleFilterSubmit}
                extraFilters={extraFilters}
            >
                <Table.Row>
                    <Table.Header text="USER" />
                    <Table.Header text="USERNAME" />
                    <Table.Header text="ROLE" />
                    <Table.Header text="STATUS" />
                    <Table.Header text="ACTIONS" />
                </Table.Row>

                {users.map((row) => (
                    <Table.Row key={row.id}>
                        <Table.Data>
                            <UserCell name={row.name} email={row.email} />
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="grayish-blue" align="center">
                                {row.username}
                            </Text>
                        </Table.Data>
                        <Table.Data>
                            <RoleBadge role={row.role} />
                        </Table.Data>
                        <Table.Data>
                            <div className="flex justify-center">
                                <Status type="status" variant={row.status} />
                            </div>
                        </Table.Data>
                        <Table.Data>
                            <div className="flex justify-center gap-2">
                                <ActionButtons
                                    id={row.id}
                                    extraParams={{ name: row.name }}
                                    actions={getRowActions(row.role)}
                                />
                            </div>
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>

            {/* Popup Uses */}
            <Outlet />
        </div>
    );
}

export default UserManagement;
