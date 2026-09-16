// General Imports
import type { ReactNode } from "react";
import { Outlet, useLoaderData } from "react-router";

// Components
import { Card } from "../components/Card";
import Icon from "../components/Icon";
import { Text } from "../components/Text";
import Table from "../components/Table";
import Status from "../components/Status";
import { ActionButton, ColumnText, DateTime, RoleBadge } from "../components/TableCells";
import PageHeader from "../components/PageHeader";

// Material UI Icons
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
import useNavigateDefault, { ROUTES } from "../hooks/useNavigateDefault";
import { Role, Status as StatusType } from "@qcpesopedro/shared/prisma/browser";
import { SelectInput } from "../components/Input";
import useSearchParamsTable from "../hooks/useSearchParamsTable";
import { TimeframeInputs, TimeframeSelect } from "../components/Timeframe";
import useTimeframeFilter from "../hooks/useTimeFrameFilter";

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

interface AccountLog {
    id: number;
    fullName: string;
    role: Role;
    loginCount: number;
    lastLogin: string | null;
    status: StatusType;
}

function LoginMonitoring() {
    const timeframeFilter = useTimeframeFilter("day");
    const { searchParams } = useSearchParamsTable();
    const data = useLoaderData();
    const navigate = useNavigateDefault();
    const handleHistory = (id: string) => () => navigate(ROUTES.monitoring.view(id), true);

    const extraFilters = (
        <div className="flex gap-4 items-center">
            <TimeframeInputs
                startDate={timeframeFilter.startDate}
                endDate={timeframeFilter.endDate}
                handleStartDateChange={timeframeFilter.handleStartDateChange}
                handleEndDateChange={timeframeFilter.handleEndDateChange}
            />
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
                    { content: "Online", value: StatusType.ONLINE },
                    { content: "Offline", value: StatusType.OFFLINE },
                    { content: "Logged Out", value: StatusType.LOGGED_OUT },
                    { content: "Disabled", value: StatusType.DISABLED },
                ]}
                name="status"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
                defaultValue={searchParams.status}
            />
        </div>
    );

    return (
        <>
            {/* Page Header */}
            <PageHeader primaryText="Login Monitoring" secondaryText="Monitor employee attendance and login history.">
                <div>
                    <TimeframeSelect
                        timeframe={timeframeFilter.timeframe}
                        handleTimeframeChange={timeframeFilter.handleTimeframeChange}
                    />
                </div>
            </PageHeader>

            {/* Monitoring Cards */}
            <MonitorCardGroup>
                <MonitorCard color="green" icon={PeopleAltOutlinedIcon} description="Employees Currently Logged In">
                    {data?.currentlyLogged ?? "N/A"}
                </MonitorCard>
                <MonitorCard color="blue" icon={LaptopOutlinedIcon} description="Total Logins">
                    {data?.totalLogIn ?? "N/A"}
                </MonitorCard>
                <MonitorCard color="red" icon={WarningAmberOutlinedIcon} description="Total Logouts">
                    {data?.totalLogOut ?? "N/A"}
                </MonitorCard>
                <MonitorCard color="gray" icon={AccessTimeOutlinedIcon} description="Avg Session Duration">
                    {data?.avgSession ?? "N/A"}
                </MonitorCard>
            </MonitorCardGroup>
            <br className="block mb-6" />

            {/* Table Data */}
            <Table
                filterView={true}
                extraFilters={extraFilters}
                pagination={true}
                isExternalFilterChanged={timeframeFilter.isTimeframeChanged}
            >
                <Table.Row>
                    <Table.Header text="Employee Name" />
                    <Table.Header text="Role" />
                    <Table.Header text="Total Login Sessions" />
                    <Table.Header text="Last Login" />
                    <Table.Header text="Current Status" />
                    <Table.Header text="Action" />
                </Table.Row>

                {/*  Sessions Data */}
                {data?.accountLogs?.map((log: AccountLog) => (
                    <Table.Row key={log.id}>
                        <Table.Data>
                            <ColumnText>{log.fullName}</ColumnText>
                        </Table.Data>
                        <Table.Data>
                            <RoleBadge role={log.role} />
                        </Table.Data>
                        <Table.Data>
                            <ColumnText>{log.loginCount}</ColumnText>
                        </Table.Data>
                        <Table.Data>
                            {log.lastLogin ? (
                                <DateTime dateTime={new Date(log.lastLogin)} />
                            ) : (
                                <ColumnText>-</ColumnText>
                            )}
                        </Table.Data>
                        <Table.Data>
                            <Status type="status" variant={log.status} />
                        </Table.Data>

                        <Table.Data>
                            <ActionButton id={String(log.id)} handleClick={handleHistory} text="View History" />
                            {/* Yung log.name di pa final yan dapat id */}
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
