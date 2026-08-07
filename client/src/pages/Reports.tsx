import { Outlet } from "react-router";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Card } from "../components/Card";
import { BarChart } from "../components/BarChart";
import Icon from "../components/Icon";
import type { MouseEventHandler, ReactNode } from "react";
import { Text } from "../components/Text";
import { ROUTES, useNavigateDefault } from "../hooks/reroute";
import { ChartColorClasses } from "../types/charts";

export const smapleBarData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
        {
            label: "Total Transactions",
            data: [90, 130, 110, 70, 40],
            backgroundColor: ChartColorClasses["primary-blue"],
        },
    ],
};

export const sampleBarptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: "bottom",
            align: "center",
            labels: {
                usePointStyle: true,
                pointStyle: "circle",
                boxWidth: 10,
            },
        },
        title: {
            display: false,
            text: "Chart Example",
            position: "top",
            align: "center",
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 45,
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
} as const;

function ReportCard({ children, onClick }: { children: ReactNode; onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Button className="bg-white gap-5! p-5! block" variant="white-black" onClick={onClick}>
            <div className="w-full flex justify-center ">
                <Icon
                    icon={DescriptionOutlinedIcon}
                    size="giant"
                    variant="primary-blue"
                    align="center"
                    bg={{ variant: "grayish-blue-opaque", type: "circle", padding: "big" }}
                />
            </div>
            <br className="mb-3 block" />

            <Text align="center" weight="bold">
                {children}
            </Text>
        </Button>
    );
}

function ButtonGroup() {
    return (
        <div className="flex gap-2">
            <Button
                size="small"
                variant="white-black"
                leftIcon={{ icon: FileDownloadOutlinedIcon, size: "medium", variant: "black" }}
            >
                Download Excel
            </Button>
            <Button
                size="small"
                variant="white-black"
                leftIcon={{ icon: FileDownloadOutlinedIcon, size: "medium", variant: "black" }}
            >
                Download PDF
            </Button>
            <Button
                size="small"
                variant="white-black"
                leftIcon={{ icon: FileDownloadOutlinedIcon, size: "medium", variant: "black" }}
            >
                Preview File
            </Button>
            <Button
                size="small"
                variant="blue"
                leftIcon={{ icon: DescriptionOutlinedIcon, size: "medium", variant: "white" }}
            >
                Generate Report
            </Button>
        </div>
    );
}

function Reports() {
    const navigate = useNavigateDefault();
    return (
        <>
            <div className="min-h-screen flex flex-col gap-6">
                <PageHeader primaryText="Reports Center" secondaryText="Generate and export system-wide reports.">
                    {/* <ButtonGroup /> */}
                </PageHeader>
                <div className="grid grid-cols-4 gap-4">
                    <ReportCard onClick={() => navigate(ROUTES.reports.preview("daily"))}>Daily Report</ReportCard>
                    <ReportCard onClick={() => navigate(ROUTES.reports.preview("weekly"))}>Weekly Report</ReportCard>
                    <ReportCard onClick={() => navigate(ROUTES.reports.preview("monthly"))}>Monthly Report</ReportCard>
                    <ReportCard onClick={() => navigate(ROUTES.reports.preview("overall"))}>
                        Transaction Summary
                    </ReportCard>
                    {/* <ReportCard>Job Fair Report</ReportCard>
                    <ReportCard>SPES Report</ReportCard>
                    <ReportCard>Accreditation Report</ReportCard> */}
                </div>
                <Card>
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">Transaction Summary Preview</Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart options={sampleBarptions} data={smapleBarData} height={"80px"}></BarChart>
                    </Card.Body>
                </Card>

                {/* Popup Uses */}
                <Outlet />
            </div>
        </>
    );
}

export default Reports;
