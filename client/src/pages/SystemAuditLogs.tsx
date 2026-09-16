// General Imports
import { Outlet, useLoaderData } from "react-router";
import { formatCapitalize } from "../utils/text";

// PEDRO SHARED IMPORTS
import { type AuditLogsResponseType } from "@qcpesopedro/shared/schema/audit";

// Components
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import { Text } from "../components/Text";
import { ColumnDesc, ColumnDescItalic, DateTime, Identifier } from "../components/TableCells";
import { GeneralInput, LeftLabeledInput, SelectInput } from "../components/Input";

// Test Data
import type { AuditLogRecord } from "../data/auditLogs";
import { LogAction, Role } from "@qcpesopedro/shared/prisma/enums";
import useTimeframeFilter from "../hooks/useTimeFrameFilter";
import { TimeframeInputs, TimeframeSelect } from "../components/Timeframe";

// Define the props
interface SystemAuditLogsProps {
    logsData: AuditLogRecord[];
}

// Helper component for the  Name and Role cell
function UserCell({ name, role }: { name: string; role: string }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <Text size="description" weight="bold" variant="dark-blue" align="center">
                {name}
            </Text>
            <Text size="small" weight="bold" variant="grayish-blue" align="center" className="uppercase mt-0.5">
                {role}
            </Text>
        </div>
    );
}

// Main Page
function SystemAuditLogs() {
    const timeframeFilter = useTimeframeFilter("day");
    const auditLogs: AuditLogsResponseType = useLoaderData();

    // Extra filter inputs for the Table Filter Section
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
                    { content: "All Actions", value: "" },
                    { content: "Transaction Actions", value: "TRANSACTION" },
                    { content: "End Shift Actions", value: "SHIFT" },
                    { content: "User Role Actions", value: "USER" },
                ]}
                name="actionPerformed"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
            />
        </div>
    );

    return (
        <div className="flex flex-col w-full">
            <PageHeader
                primaryText="System Audit Logs"
                secondaryText="Review transaction modifications, shift approvals, and data integrity events."
            >
                <TimeframeSelect
                    timeframe={timeframeFilter.timeframe}
                    handleTimeframeChange={timeframeFilter.handleTimeframeChange}
                />
            </PageHeader>

            <Table
                pagination={true}
                filterView={true}
                extraFilters={extraFilters}
                isExternalFilterChanged={timeframeFilter.isTimeframeChanged}
            >
                <Table.Row>
                    <Table.Header text="DATE & TIME" />
                    <Table.Header text="USER" />
                    <Table.Header text="ACTION PERFORMED" />
                    <Table.Header text="AFFECTED RECORD" />
                    <Table.Header text="CHANGES / DETAILS" />
                    <Table.Header text="REMARKS" />
                </Table.Row>

                {auditLogs.map((row) => (
                    <Table.Row key={row.id}>
                        <Table.Data>
                            <DateTime dateTime={row.createdAt} />
                        </Table.Data>
                        <Table.Data>
                            <UserCell
                                name={`${row.user?.firstName} ${row.user?.lastName}`}
                                role={row.user?.role ?? Role.FRONTLINE}
                            />
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="dark-blue" weight="bold" align="center">
                                {formatCapitalize(String(row.actionPerformed))}
                            </Text>
                        </Table.Data>
                        <Table.Data>
                            <Identifier>{row.affectedRecordId}</Identifier>
                        </Table.Data>
                        <Table.Data>
                            <ColumnDesc>{row.changesDetails}</ColumnDesc>
                        </Table.Data>
                        <Table.Data>
                            <ColumnDescItalic>{row.remarks}</ColumnDescItalic>
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>

            {/* Popup Uses */}
            <Outlet />
        </div>
    );
}

export default SystemAuditLogs;
