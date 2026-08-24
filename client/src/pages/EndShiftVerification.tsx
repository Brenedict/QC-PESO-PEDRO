// General Imports
import { Outlet, useLoaderData } from "react-router";

// Components
import PageHeader from "../components/PageHeader";
import { Card } from "../components/Card";
import { Text } from "../components/Text";
import Table from "../components/Table";
import Profile from "../components/Profile";
import Status from "../components/Status";
import Button from "../components/Button";
import { ActionButton, DateTime } from "../components/TableCells";

// Sample Data
import type { ShiftRecord } from "../data/shiftRecords";

// Custom Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";

// Materials UI Icon
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ESSStatus, type Shift, type ShiftLog, type User } from "@qcpesopedro/shared/prisma/browser";
import { SelectInput } from "../components/Input";
import { TIMEFRAME_TYPE } from "../api/dateService";
import { useSearchParamsTable } from "../hooks/table";

// Define the props
interface EndShiftVerificationProps {
    shiftData: ShiftRecord[];
}

// Components
function StatCard({ title, value, valueVariant = "dark-blue" }: { title: string; value: string; valueVariant?: any }) {
    return (
        <Card className="w-full flex-1">
            <Card.Body className="p-6">
                <div className="mb-2">
                    <Text size="description" variant="grayish-blue" weight="semiBold">
                        {title}
                    </Text>
                </div>
                <Text size="giant" variant={valueVariant} weight="bold">
                    {value}
                </Text>
            </Card.Body>
        </Card>
    );
}

function EmployeeCell({ name }: { name: string }) {
    return (
        <div className="flex items-center gap-3 w-full justify-center md:justify-start md:pl-5">
            <div className="shrink-0">
                <Profile size="small" userFullName={name} bg="grayish-blue-opaque" textColor="primary-blue" />
            </div>
            <Text size="description" weight="bold" variant="dark-blue">
                {name}
            </Text>
        </div>
    );
}

// Main Page
function EndShiftVerification() {
    const { searchParams } = useSearchParamsTable();
    const data = useLoaderData();
    const navigate = useNavigateDefault();

    const handleReview = (id: string) => () => {
        navigate(ROUTES.endshift.review(id), true);
    };

    const handleDetails = (id: string) => () => {
        navigate(ROUTES.endshift.details(id), true);
    };

    const getDayPeriod = (date: Date) => {
        const hour = date.getHours();
        return hour < 12 ? "Morning" : "Afternoon";
    };

    const extraFilters = (
        <div className="flex gap-4 items-center">
            <SelectInput
                optionList={[
                    { content: "Overall", value: TIMEFRAME_TYPE.overall },
                    { content: "This Day", value: "" },
                    { content: "This Week", value: TIMEFRAME_TYPE.week },
                    { content: "This Month", value: TIMEFRAME_TYPE.month },
                    { content: "This Year", value: TIMEFRAME_TYPE.year },
                ]}
                name="timeframe"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
                defaultValue={searchParams.timeframe ?? ""}
            />
            <SelectInput
                optionList={[
                    { content: "All Status", value: "" },
                    { content: "Ongoing", value: ESSStatus.ONGOING },
                    { content: "Pending", value: ESSStatus.PENDING },
                    { content: "Needs Revision", value: ESSStatus.REVISION },
                    { content: "Rejected", value: ESSStatus.REJECTED },
                    { content: "Approved", value: ESSStatus.APPROVED },
                ]}
                name="status"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
                defaultValue={searchParams.outcome}
            />
        </div>
    );

    return (
        <div className="flex flex-col w-full relative">
            <PageHeader
                primaryText="End Shift Verification"
                secondaryText="Review, verify, and approve daily shift summaries."
            >
                <Button
                    size="small"
                    variant="white-black"
                    leftIcon={{ icon: FileDownloadOutlinedIcon, size: "medium", variant: "black" }}
                >
                    Export
                </Button>
            </PageHeader>

            <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
                <StatCard title="Pending" value={data?.pending ?? "N/A"} />
                <StatCard title="Approved" value={data?.approved ?? "N/A"} />
                <StatCard title="Needs Revision" value={data?.revision ?? "N/A"} />
                <StatCard title="Rejected" value={data?.rejected ?? "N/A"} valueVariant="red" />
                <StatCard title="Avg Approval Time" value={data?.average ?? "N/A"} valueVariant="primary-blue" />
            </div>

            <Table pagination={true} filterView={true} extraFilters={extraFilters}>
                <Table.Row>
                    <Table.Header text="EMPLOYEE" />
                    <Table.Header text="SHIFT" />
                    <Table.Header text="TRANSACTIONS" />
                    <Table.Header text="SUBMITTED" />
                    <Table.Header text="STATUS" />
                    <Table.Header text="ACTION" />
                </Table.Row>

                {/*shiftData prop*/}
                {data?.shifts.map((shift: ShiftLog & { user: User; _count: { transactions: number } }) => (
                    <Table.Row key={shift.id}>
                        <Table.Data>
                            <EmployeeCell name={shift.user.fullName ?? "N/A"} />
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="grayish-blue" align="center">
                                {shift?.timeIn ? getDayPeriod(new Date(shift.timeIn)) : "N/A"}
                            </Text>
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="dark-blue" weight="bold" align="center">
                                {shift?._count.transactions ?? "N/A"}
                            </Text>
                        </Table.Data>
                        <Table.Data>
                            <DateTime dateTime={shift?.timeOut ? new Date(shift.timeOut) : null} />
                        </Table.Data>
                        <Table.Data>
                            <Status type="verification" variant={shift?.status ?? "PENDING"} />
                        </Table.Data>
                        <Table.Data>
                            <div className="flex gap-3">
                                <ActionButton handleClick={handleDetails} id={String(shift.id)} text="Details" />
                                {shift?.status === "PENDING" && (
                                    <ActionButton handleClick={handleReview} id={String(shift.id)} text="Review" />
                                )}
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

export default EndShiftVerification;
