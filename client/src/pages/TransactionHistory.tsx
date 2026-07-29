import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import type { Transaction } from "../data/transactions";
import Table from "../components/Table";
import Status from "../components/Status";
import { ActionButtons, ColumnText, DateTime, Identifier } from "../components/TableCells";

function TransactionHistory({
    transactions,
    onFilterSubmit,
}: {
    transactions: Transaction[];
    onFilterSubmit?: React.SubmitEventHandler<HTMLFormElement>;
}) {
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
                            <ActionButtons id={transaction.id} />
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>
        </>
    );
}

export default TransactionHistory;
