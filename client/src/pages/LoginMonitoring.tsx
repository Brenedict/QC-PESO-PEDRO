// General Imports
import type { ReactNode } from "react";
import { Outlet } from "react-router";

// Components
import { Card } from "../components/Card";
import Icon from "../components/Icon";
import { Text } from "../components/Text";
import Table from "../components/Table";
import Status from "../components/Status";
import { ActionButton, ColumnText, DateTime, RoleBadge } from "../components/TableCells";
import PageHeader from "../components/PageHeader";

// Icons
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

// Types
import { type MaterialIcon } from "../types/common";

// Test Data
import { type EmployeeSession } from "../data/employeeSessions";

// Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";

const iconClasses = {
    green: { variant: "green", bgVariant: "green-opaque" },
    blue: { variant: "primary-blue", bgVariant: "grayish-blue-opaque" },
    red: { variant: "red", bgVariant: "red-opaque" },
    gray: { variant: "grayish-blue", bgVariant: "off-white-border" },
} as const;

type IconColor = keyof typeof iconClasses;

interface MonitorCardProps {
    icon: MaterialIcon;
    color: IconColor;
    description: string;
    children: ReactNode;
}

function MonitorCard({ icon, color, description, children }: MonitorCardProps) {
    return (
        <Card className="flex-1">
            <Card.Body>
                <div className="mb-3">
                    <Icon
                        variant={iconClasses[color].variant}
                        size="big"
                        icon={icon}
                        align="left"
                        bg={{ variant: iconClasses[color].bgVariant, padding: "big", type: "normal" }}
                    />
                </div>
                <Text size="description" weight="normal" align="left" variant="grayish-blue">
                    {description}
                </Text>

                <Text size="bigger" weight="bold" align="left" variant="dark-blue">
                    {children}
                </Text>
            </Card.Body>
        </Card>
    );
}

function MonitorCardGroup({ children }: { children: ReactNode }) {
    return <section className="flex gap-4">{children}</section>;
}

interface LoginMonitoringProps {
    //employees
    currentlyLogged: ReactNode;
    totalLogins: ReactNode;
    totalLogouts: ReactNode;
    sessionDuration: ReactNode;
    handleFilterSubmit: React.SubmitEventHandler<HTMLFormElement>;
    employeeSessions: EmployeeSession[];
}

function LoginMonitoring({
    currentlyLogged,
    totalLogins,
    totalLogouts,
    sessionDuration,
    handleFilterSubmit,
    employeeSessions,
}: LoginMonitoringProps) {
    const navigate = useNavigateDefault();

    const handleHistory = (id: string) => () => navigate(ROUTES.monitoring.view(id), true);

    return (
        <>
            {/* Page Header */}
            <PageHeader
                primaryText="Login Monitoring"
                secondaryText="Monitor employee attendance and login history."
                icon={{ variant: "primary-blue", icon: OndemandVideoIcon, size: "bigger" }}
            />

            {/* Monitoring Cards */}
            <MonitorCardGroup>
                <MonitorCard color="green" icon={PeopleAltOutlinedIcon} description="Employees Currently Logged In">
                    {currentlyLogged}
                </MonitorCard>
                <MonitorCard color="blue" icon={LaptopOutlinedIcon} description="Total Logins Today">
                    {totalLogins}
                </MonitorCard>
                <MonitorCard color="red" icon={WarningAmberOutlinedIcon} description="Total Logouts Today">
                    {totalLogouts}
                </MonitorCard>
                <MonitorCard color="gray" icon={AccessTimeOutlinedIcon} description="Avg Session Duration">
                    {sessionDuration}
                </MonitorCard>
            </MonitorCardGroup>
            <br className="block mb-6" />

            {/* Table Data */}
            <Table handleFilterSubmit={handleFilterSubmit}>
                <Table.Row>
                    <Table.Header text="Employee Name" />
                    <Table.Header text="Role" />
                    <Table.Header text="Total Login Sessions" />
                    <Table.Header text="Last Login" />
                    <Table.Header text="Current Status" />
                    <Table.Header text="Action" />
                </Table.Row>

                {/*  Sessions Data */}
                {employeeSessions.map((employee) => (
                    <Table.Row key={employee.id}>
                        <Table.Data>
                            <ColumnText>{employee.name}</ColumnText>
                        </Table.Data>
                        <Table.Data>
                            <RoleBadge role={employee.role} />
                        </Table.Data>
                        <Table.Data>
                            <ColumnText>{employee.totalLoginSessions}</ColumnText>
                        </Table.Data>
                        <Table.Data>
                            <DateTime dateTime={employee.lastLogin} />
                        </Table.Data>
                        <Table.Data>
                            <Status type="connection" variant={employee.status} />
                        </Table.Data>

                        <Table.Data>
                            <ActionButton id={employee.id} handleClick={handleHistory} text="View History" />
                            {/* Yung employee.name di pa final yan dapat id */}
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>

            {/* Popup Uses */}
            <Outlet />
        </>
    );
}

export default LoginMonitoring;
