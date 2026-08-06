import { Form, useParams } from "react-router";
import { ROUTES, useNavigateDefault } from "../../hooks/reroute";
import { decode } from "../../utils/hashids";
import { employeeSessions } from "../../data/employeeSessions";
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import { GeneralInput } from "../Input";
import { PopupButton } from "./PopupPartials";
import Table from "../Table";
import { formatDuration, formatMonthDay, formatTime } from "../../utils/time";
import { ColumnDescItalic, ColumnText, Identifier } from "../TableCells";

export function PopupViewHistory() {
    const navigate = useNavigateDefault();
    const { shiftId } = useParams();

    if (!shiftId) return null;

    const decodedId = decode(shiftId);
    const shift = employeeSessions.find((shift) => shift.id === decodedId);
    if (!shift) return null;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.monitoring.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.monitoring.root, true)}>
                <Text weight="bold">Login History: {shift.name}</Text>
            </Dialog.Header>
            <Dialog.Body className="p-0!">
                <Table noCardStyle={true}>
                    <Table.Row>
                        <Table.Header text="date" />
                        <Table.Header text="time in" />
                        <Table.Header text="time out" />
                        <Table.Header text="duration" />
                        <Table.Header text="logout reason" />
                    </Table.Row>

                    {shift.loginHistory.map((history) => (
                        <Table.Row key={shift.id}>
                            <Table.Data>
                                <ColumnText>{formatMonthDay(history.dateTimeIn)}</ColumnText>
                            </Table.Data>
                            <Table.Data>
                                <Identifier>{formatTime(history.dateTimeIn)}</Identifier>
                            </Table.Data>
                            <Table.Data>
                                <Identifier>{formatTime(history.dateTimeOut)}</Identifier>
                            </Table.Data>
                            <Table.Data>
                                <ColumnText>{formatDuration(history.dateTimeIn, history.dateTimeOut)}</ColumnText>
                            </Table.Data>
                            <Table.Data>
                                <ColumnDescItalic>{history.logoutReason}</ColumnDescItalic>
                            </Table.Data>
                        </Table.Row>
                    ))}
                </Table>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.monitoring.root, true)}>
                    Close
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}
