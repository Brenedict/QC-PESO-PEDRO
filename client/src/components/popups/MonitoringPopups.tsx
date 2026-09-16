// General Imports
import { useLoaderData, useParams } from "react-router";

// Components
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import Table from "../Table";
import { PopupButton } from "./PopupPartials";
import { ColumnDescItalic, ColumnText, Identifier } from "../TableCells";

// Utils
import { decode } from "../../utils/hashids";
import { formatDuration, formatMonthDay, formatTime } from "../../utils/time";

// Custom Hooks
import useNavigateDefault, { ROUTES } from "../../hooks/useNavigateDefault";

// Test data
import { employeeSessions } from "../../data/employeeSessions";
import useTablePage from "../../hooks/useTablePage";

interface AccountLogData {
    id: number;
    userId: number;
    logIn: string;
    logOut: string | null;
    reason: string | null;
    remarks: string | null;
    sessionDuration: string;
}

export function PopupViewHistory() {
    const { pageKey, closeAction } = useTablePage("subpage", ROUTES.monitoring.root);
    const navigate = useNavigateDefault();
    const { accountLogs, user } = useLoaderData();

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.monitoring.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={closeAction}>
                <Text weight="bold">Login History: {user ?? "N/A"}</Text>
            </Dialog.Header>
            <Dialog.Body className="p-0!">
                <Table noCardStyle={true} pagination={true} items={5} pageKey={pageKey}>
                    <Table.Row>
                        <Table.Header text="date" />
                        <Table.Header text="time in" />
                        <Table.Header text="time out" />
                        <Table.Header text="duration" />
                        <Table.Header text="logout reason" />
                    </Table.Row>

                    {accountLogs?.map((log: AccountLogData) => (
                        <Table.Row key={log.id}>
                            <Table.Data>
                                <ColumnText>{formatMonthDay(new Date(log.logIn))}</ColumnText>
                            </Table.Data>
                            <Table.Data>
                                <Identifier>{formatTime(new Date(log.logIn))}</Identifier>
                            </Table.Data>
                            <Table.Data>
                                <Identifier>{log.logOut ? formatTime(new Date(log.logOut)) : "-"}</Identifier>
                            </Table.Data>
                            <Table.Data>
                                <ColumnText>{log.sessionDuration}</ColumnText>
                            </Table.Data>
                            <Table.Data>
                                <ColumnDescItalic>{log.reason ?? "-"}</ColumnDescItalic>
                            </Table.Data>
                        </Table.Row>
                    ))}
                </Table>
            </Dialog.Body>
        </Dialog>
    );
}
