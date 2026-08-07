import type { ReactNode } from "react";
import { ROUTES, useNavigateDefault } from "../../hooks/reroute";
import type { MaterialIcon } from "../../types/common";
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { Link } from "react-router";
import Table from "../Table";
import { shiftRecords } from "../../data/shiftRecords";
import { BarChart } from "../BarChart";
import { samplePieData, samplePieOptions, samplePopupBarData, samplePopupBarOptions } from "../../data/overviewCharts";
import { DoughnutChart } from "../DoughnutChart";

function TransactionMiniCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="bg-off-white rounded-xl p-4 grow">
            <Text variant="grayish-blue" size="description" weight="medium" align="center">
                {label}
            </Text>
            <Text variant="dark-blue" size="big" weight="bold" align="center">
                {value}
            </Text>
        </div>
    );
}

interface ChartLabelProps {
    label: string;
    leftIcon?: MaterialIcon;
}

function LabelText({ label, leftIcon }: ChartLabelProps) {
    return (
        <>
            <Text
                variant="dark-blue"
                size="description"
                weight="bold"
                svg={
                    leftIcon
                        ? { icon: leftIcon, size: "bigMedium", position: "left", gap: "medium", variant: "black" }
                        : undefined
                }
            >
                {label}
            </Text>
        </>
    );
}

function ChartContainer({ children, ...props }: { children: ReactNode } & ChartLabelProps) {
    return (
        <div className="grow min-h-0">
            <LabelText {...props} />
            <br className="block mb-4" />
            <div>{children}</div>
        </div>
    );
}

interface PopupTransactionDetailsProps {
    label: string;
    today: number;
    thisWeek: number;
    thisMonth: number;
    history: typeof shiftRecords; //temporary lang
}

export function PopupTransactionDetails({ label, today, thisWeek, thisMonth, history }: PopupTransactionDetailsProps) {
    const navigate = useNavigateDefault();
    return (
        <Dialog className="w-3xl" dropShadow={true} onClose={() => navigate(ROUTES.dashboard.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.dashboard.root, true)}>
                <Text size="medium" weight="bold">
                    {label} Details
                </Text>
            </Dialog.Header>
            <Dialog.Body className="p-6! overflow-y-auto! max-h-[80vh]!">
                <div className="flex gap-4 mb-8">
                    <TransactionMiniCard label="Today" value={today} />
                    <TransactionMiniCard label="This Week" value={thisWeek} />
                    <TransactionMiniCard label="This Month" value={thisMonth} />
                </div>

                <div className="flex gap-8 mb-8">
                    <ChartContainer label="Hourly Distribution" leftIcon={BarChartOutlinedIcon}>
                        <BarChart options={samplePopupBarOptions} data={samplePopupBarData} />
                    </ChartContainer>
                    <ChartContainer label="Demographics" leftIcon={PeopleAltOutlinedIcon}>
                        <DoughnutChart options={samplePieOptions} data={samplePieData}></DoughnutChart>
                    </ChartContainer>
                </div>
                <div className="flex justify-between mb-4">
                    <LabelText label="Most Active Frontline Staff" />
                    <Link to={ROUTES.history.root}>
                        <Text
                            variant="primary-blue"
                            size="description"
                            weight="medium"
                            className="w-max! hover:underline"
                        >
                            View Ledger →
                        </Text>
                    </Link>
                </div>
                <Table noCardStyle={true}>
                    <Table.Row>
                        <Table.Header text="staff member" />
                        <Table.Header text="processed today" />
                    </Table.Row>

                    {history.slice(0, 3).map((user) => (
                        <Table.Row key={user.id}>
                            <Table.Data>{user.name}</Table.Data>
                            <Table.Data>{user.trans}</Table.Data>
                        </Table.Row>
                    ))}
                </Table>
            </Dialog.Body>
        </Dialog>
    );
}
