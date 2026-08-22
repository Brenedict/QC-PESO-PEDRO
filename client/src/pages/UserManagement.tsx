// General Imports
import { Outlet, useLoaderData } from "react-router";

// PEDRO SHARED IMPORTS
import { Role } from "@qcpesopedro/shared/prisma/enums.ts";
import type { UserFormCreateType } from "@qcpesopedro/shared/schema/users";

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

// Material UI Icons
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import RemoveModeratorOutlinedIcon from "@mui/icons-material/RemoveModeratorOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

// Custom Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";

// Contexts
import { useUserGlobal } from "../context/UserGlobalContext.tsx";
import { useSearchParamsTable } from "../hooks/table.ts";
import type { User } from "@qcpesopedro/shared/prisma/browser.ts";
import { useAuth } from "../context/AuthContext.tsx";

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

function UserManagement() {
    const { user } = useAuth();
    const { searchParams } = useSearchParamsTable();
    const navigate = useNavigateDefault();

    const { total, active, inactive, roles, users } = useLoaderData();

    const { role } = useUserGlobal();
    const userRole = role;

    const RoleButtonMap: Record<Role, RoleButton | null> = {
        SUPERADMIN: null,
        ADMIN: {
            icon: RemoveModeratorOutlinedIcon,
            text: "Demote",
            color: "black",
            handleClick: (id) => () => navigate(ROUTES.userManagement.demote(id), true),
        },
        FRONTLINE: {
            icon: ShieldOutlinedIcon,
            text: "Promote",
            color: "blue",
            handleClick: (id) => () => navigate(ROUTES.userManagement.promote(id), true),
        },
    };

    const getRowActions = (rowRole: Role): ActionTypes => {
        const actions: ActionTypes = [];
        if (RoleButtonMap[rowRole] && userRole === "SUPERADMIN") {
            actions.push(RoleButtonMap[rowRole]!);
        }

        if (userRole === "ADMIN" && rowRole !== "FRONTLINE") {
            return actions;
        }

        if (rowRole === "SUPERADMIN" && userRole !== "SUPERADMIN") {
            return actions;
        }

        actions.push(
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
                icon: ManageAccountsOutlinedIcon,
                text: "Manage",
                color: "black",
                handleClick: (id) => () => navigate(ROUTES.userManagement.manage(id), true),
            }
        );

        return actions;
    };

    const extraFilters = (
        <div className="flex gap-4 items-center">
            <SelectInput
                optionList={[
                    { content: "All Roles", value: "" },
                    { content: "Super Administrator", value: Role.SUPERADMIN },
                    { content: "Administrator", value: Role.ADMIN },
                    { content: "Frontline Encoder", value: Role.FRONTLINE },
                ]}
                name="role"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
                defaultValue={searchParams.role}
            />
            <SelectInput
                optionList={[
                    { content: "All Statuses", value: "" },
                    { content: "Active", value: "ACTIVE" },
                    { content: "Inactive", value: "INACTIVE" },
                ]}
                name="status"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
                defaultValue={searchParams.status}
            />
        </div>
    );

    return (
        <div className="flex flex-col w-full">
            <PageHeader
                primaryText="User Management"
                secondaryText="Manage system access, roles, and employee accounts."
            >
                {user?.role === "SUPERADMIN" && (
                    <Button
                        size="normal"
                        variant="blue"
                        leftIcon={{ icon: PersonAddOutlinedIcon, size: "medium", variant: "white" }}
                        onClick={() => navigate(ROUTES.userManagement.create)}
                    >
                        Add User
                    </Button>
                )}
            </PageHeader>

            <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
                <StatCard title="Total Users" value={total} />
                <StatCard title="Active Users" value={active} />
                <StatCard title="Inactive Users" value={inactive} />
                <StatCard title="Roles" value={roles} />
            </div>

            <Table pagination={true} filterView={true} extraFilters={extraFilters}>
                <Table.Row>
                    <Table.Header text="USER" />
                    <Table.Header text="USERNAME" />
                    <Table.Header text="ROLE" />
                    <Table.Header text="STATUS" />
                    <Table.Header text="ACTIONS" />
                </Table.Row>

                {users.map((user: User) => (
                    <Table.Row key={user.id}>
                        <Table.Data>
                            <UserCell name={`${user.firstName} ${user.lastName}`} email={user.email} />
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="grayish-blue" align="center">
                                {user.username}
                            </Text>
                        </Table.Data>
                        <Table.Data>
                            <RoleBadge role={user?.role ?? "ADMIN"} />
                        </Table.Data>
                        <Table.Data>
                            <div className="flex justify-center">
                                <Status type="status" variant={user?.status ?? "LOGGED_OUT"} />
                            </div>
                        </Table.Data>
                        <Table.Data>
                            <div className="flex justify-center gap-2">
                                {user.role !== "SUPERADMIN" && (
                                    <ActionButtons
                                        id={String(user.id)}
                                        extraParams={{ name: `${user.firstName} ${user.lastName}` }}
                                        actions={getRowActions(user?.role ?? "ADMIN")}
                                    />
                                )}
                            </div>
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>

            <Outlet />
        </div>
    );
}

export default UserManagement;
