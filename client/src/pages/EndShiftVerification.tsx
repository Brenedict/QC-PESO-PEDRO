// General Imports
import { Outlet } from "react-router";

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

// Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";

// Icon
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

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
function EndShiftVerification({ shiftData }: EndShiftVerificationProps) {
    const navigate = useNavigateDefault();

    const handleReview = (id: string) => () => {
        navigate(ROUTES.endshift.review(id));
    };

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
                <StatCard title="Pending" value="5" />
                <StatCard title="Approved Today" value="18" />
                <StatCard title="Needs Revision" value="2" />
                <StatCard title="Rejected" value="1" valueVariant="red" />
                <StatCard title="Avg Approval Time" value="12m" valueVariant="primary-blue" />
            </div>

            <Table pagination={true} filterView={true}>
                <Table.Row>
                    <Table.Header text="EMPLOYEE" />
                    <Table.Header text="SHIFT" />
                    <Table.Header text="TRANSACTIONS" />
                    <Table.Header text="SUBMITTED" />
                    <Table.Header text="STATUS" />
                    <Table.Header text="ACTION" />
                </Table.Row>

                {/*shiftData prop*/}
                {shiftData.map((row) => (
                    <Table.Row key={row.id}>
                        <Table.Data>
                            <EmployeeCell name={row.name} />
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="grayish-blue" align="center">
                                {row.shift}
                            </Text>
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="dark-blue" weight="bold" align="center">
                                {row.trans}
                            </Text>
                        </Table.Data>
                        <Table.Data>
                            <DateTime dateTime={row.dateTime} />
                        </Table.Data>
                        <Table.Data>
                            <Status type="verification" variant={row.status} />
                        </Table.Data>
                        <Table.Data>
                            <ActionButton handleClick={handleReview} id={row.id} text="Review" />
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
