import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import type { Transaction } from "../data/transactions";
import Table from "../components/Table";
import Status from "../components/Status";
import { Dialog } from "../components/Dialog";
import { Text } from "../components/Text";
import { ActionButtons, ColumnText, DateTime, Identifier } from "../components/TableCells";
import { Outlet } from "react-router";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useNavigateDefault } from "../hooks/reroute";

export function BasicPopup() {
    const useNavigate = useNavigateDefault();

    return (
        <Dialog dropShadow={true} onClose={() => useNavigate("history")}>
            <Dialog.Header
                toggleRightIcon={true}
                onRightAction={() => useNavigate("history")}
                variant="grayish-blue-opaque"
            >
                <Text weight="bold">Edit Transaction: TX-260716-001</Text>
            </Dialog.Header>
            <Dialog.Body>
                <Text>This is a Dialog component using a text component</Text>
            </Dialog.Body>
            <Dialog.Footer>
                <Button size="normal">Save Changes</Button>
            </Dialog.Footer>
        </Dialog>
    );
}

function TransactionHistory({
    transactions,
    onFilterSubmit,
}: {
    transactions: Transaction[];
    onFilterSubmit?: React.SubmitEventHandler<HTMLFormElement>;
}) {
    const useNavigate = useNavigateDefault();
    const handleEdit = (id: string) => () => {
        console.log(id);
        useNavigate("historyEdit");
    };

    const handleDelete = (id: string) => () => {
        console.log(id);
    };

    return (
        <>
            <PageHeader primaryText="History Ledger" secondaryText="Comprehensive view of all historical transactions">
                <Button
                    size="small"
                    variant="white-black"
                    leftIcon={{ icon: FileDownloadOutlinedIcon, size: "medium", variant: "black" }}
                >
                    Export
                </Button>
            </PageHeader>

            <Table pagination={6} onFilterSubmit={onFilterSubmit}>
                {/* Header row */}
                <Table.Row>
                    <Table.Header text="ID" />
                    <Table.Header text="Date/Time" />
                    <Table.Header text="Type" />
                    <Table.Header text="Applicant Name" />
                    <Table.Header text="Outcome" />
                    <Table.Header text="Actions" />
                </Table.Row>

                {/* Data rows */}
                {transactions.map((transaction) => (
                    <Table.Row key={transaction.id}>
                        <Table.Data>
                            <Identifier>{transaction.id}</Identifier>
                        </Table.Data>
                        <Table.Data>
                            <DateTime dateTime={transaction.dateTime} />
                        </Table.Data>
                        <Table.Data>
                            <Status type="type" variant={transaction.type} />
                        </Table.Data>
                        <Table.Data>
                            <ColumnText>{transaction.applicant}</ColumnText>
                        </Table.Data>
                        <Table.Data>
                            <Status type="outcome" variant={transaction.outcome} />
                        </Table.Data>
                        <Table.Data>
                            <ActionButtons
                                id={transaction.id}
                                actions={[
                                    {
                                        color: "black",
                                        icon: BorderColorOutlinedIcon,
                                        handleClick: handleEdit,
                                        text: "Edit",
                                    },
                                    {
                                        color: "red",
                                        icon: PersonRemoveOutlinedIcon,
                                        handleClick: handleDelete,
                                        text: "Delete",
                                    },
                                ]}
                            />
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>
            <Outlet />
        </>
    );
}

export default TransactionHistory;
