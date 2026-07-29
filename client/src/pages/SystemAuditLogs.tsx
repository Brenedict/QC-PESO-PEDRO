import React from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import { Text } from "../components/Text";
import { DateTime, Identifier } from "../components/TableCells";
import { GeneralInput, SelectInput } from "../components/Input";
import type { AuditLogRecord } from "../data/auditLogs";

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
function SystemAuditLogs({ logsData }: SystemAuditLogsProps) {
    const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Audit Logs Filter applied");
    };

    // Extra filter inputs for the Table Filter Section
    const extraFilters = (
        <div className="flex gap-4 items-center">
            {/* Start Date */}
            <div className="flex items-center gap-2">
                <Text size="description" variant="grayish-blue" weight="medium">
                    From:
                </Text>
                <GeneralInput type="date" placeholder="Start Date" className="w-36!" />
            </div>

            {/* End Date */}
            <div className="flex items-center gap-2">
                <Text size="description" variant="grayish-blue" weight="medium">
                    To:
                </Text>
                <GeneralInput type="date" placeholder="End Date" className="w-36!" />
            </div>

            {/* Action Filter */}
            <SelectInput
                optionList={[
                    { content: "All Actions", value: "" },
                    { content: "Transaction Created", value: "created" },
                    { content: "End Shift Approved", value: "approved" },
                    { content: "User Role Changed", value: "role_changed" },
                ]}
                className="w-48!"
            />
        </div>
    );

    return (
        <div className="flex flex-col w-full">
            <PageHeader
                primaryText="System Audit Logs"
                secondaryText="Review transaction modifications, shift approvals, and data integrity events."
            />

            <Table pagination={10} onFilterSubmit={handleFilterSubmit} extraFilters={extraFilters}>
                <Table.Row>
                    <Table.Header text="DATE & TIME" />
                    <Table.Header text="USER" />
                    <Table.Header text="ACTION PERFORMED" />
                    <Table.Header text="AFFECTED RECORD" />
                    <Table.Header text="CHANGES / DETAILS" />
                    <Table.Header text="REMARKS" />
                </Table.Row>

                {logsData.map((row) => (
                    <Table.Row key={row.id}>
                        <Table.Data>
                            <DateTime dateTime={row.dateTime} />
                        </Table.Data>
                        <Table.Data>
                            <UserCell name={row.userName} role={row.userRole} />
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="dark-blue" weight="bold" align="center">
                                {row.action}
                            </Text>
                        </Table.Data>
                        <Table.Data>
                            <Identifier>{row.recordId}</Identifier>
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="grayish-blue" align="center">
                                {row.details}
                            </Text>
                        </Table.Data>
                        <Table.Data>
                            <Text size="description" variant="grayish-blue" align="center" className="italic">
                                {row.remarks}
                            </Text>
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>
        </div>
    );
}

export default SystemAuditLogs;
