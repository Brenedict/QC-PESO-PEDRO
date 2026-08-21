import type { ReactNode } from "react";
import { ROUTES, useNavigateDefault } from "../../hooks/reroute";
import type { MaterialIcon } from "../../types/common";
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { Link, useLoaderData, useLocation } from "react-router";
import Table from "../Table";
import { BarChart } from "../BarChart";
import { DoughnutChart } from "../DoughnutChart";
import { extractGroupedFromData, type AnalyticsData } from "../../api/analyticsRequests";
import {
    buildCategoryChartData,
    buildTimeSeriesChartData,
    type CategorySeriesConfig,
    type TimeSeriesConfig,
} from "../../api/chartService";
import { DASHBOARD_CARD_MAP } from "../../api/transactionService";

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
        <div className="grow min-h-0 ">
            <LabelText {...props} />
            <br className="block mb-4" />
            <div>{children}</div>
        </div>
    );
}

export function PopupTransactionDetails() {
    const location = useLocation();
    const id = location.pathname.split("/").at(-1) as string | undefined;

    const data = useLoaderData() as AnalyticsData;
    const navigate = useNavigateDefault();

    const label = id && DASHBOARD_CARD_MAP?.[id]?.title ? DASHBOARD_CARD_MAP?.[id].title : "Unknown";

    const hourlySeries: TimeSeriesConfig[] = [
        {
            key: "TOTAL",
            label,
            color: "primary-blue",
            opaqueColor: "primary-blue-opaque",
        },
    ];

    const sexSeries: CategorySeriesConfig[] = [
        { key: "MALE", label: "Male", color: "light-blue", opaqueColor: "light-blue-opaque" },
        { key: "FEMALE", label: "Female", color: "pink", opaqueColor: "pink-opaque" },
    ];

    const hourly = buildTimeSeriesChartData(data, hourlySeries, "hourly", "hourly");
    const sex = buildCategoryChartData(data, sexSeries, "sex");
    const staffs = extractGroupedFromData(data, "staff");

    return (
        <Dialog className="w-3xl" dropShadow={true} onClose={() => navigate(ROUTES.dashboard.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.dashboard.root, true)}>
                <Text size="medium" weight="bold">
                    {label} Details
                </Text>
            </Dialog.Header>
            <Dialog.Body className="p-6! overflow-y-auto! max-h-[80vh]!">
                <div className="flex gap-4 mb-8">
                    <TransactionMiniCard label="Today" value={(data?.today?.count as number | undefined) ?? 0} />
                    <TransactionMiniCard label="This Week" value={(data?.week?.count as number | undefined) ?? 0} />
                    <TransactionMiniCard label="This Month" value={(data?.month?.count as number | undefined) ?? 0} />
                </div>

                <div className="flex gap-8 mb-8">
                    <ChartContainer label="Hourly Distribution" leftIcon={BarChartOutlinedIcon}>
                        <BarChart options={hourly.options} data={hourly.data} />
                    </ChartContainer>
                    <ChartContainer label="Demographics" leftIcon={PeopleAltOutlinedIcon}>
                        <DoughnutChart options={sex.options} data={sex.data}></DoughnutChart>
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

                    {staffs.slice(0, 3).map((staff, i) => (
                        <Table.Row key={i}>
                            <Table.Data>{staff[0]}</Table.Data> {/* Name */}
                            <Table.Data>{staff[1]}</Table.Data> {/* Processed Transactions */}
                        </Table.Row>
                    ))}
                </Table>
            </Dialog.Body>
        </Dialog>
    );
}
