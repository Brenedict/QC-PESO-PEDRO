import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Card } from "../components/Card";
import { BarChart } from "../components/BarChart";
import Icon from "../components/Icon";
import type { ReactNode } from "react";
import { Text } from "../components/Text";

export const smapleBarData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
        {
            data: [90, 130, 110, 70, 40],
            borderColor: "#38bff8",
            backgroundColor: "#38bff890",
        },
    ],
};

export const sampleBarptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
            align: "center",
            labels: {
                usePointStyle: true, // Changes box to a circle/point style
                pointStyle: "circle", // Explicitly ensures it is a circle (default)
                boxWidth: 10,
            },
        },
        title: {
            display: true,
            text: "Chart Example",
            position: "top",
            align: "center",
        },
    },
} as const;

function ReportCard({ children }: { children: ReactNode }) {
    return (
        <Button className="bg-white gap-5! p-5! block" variant="white-black">
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
    return (
        <div className="min-h-screen flex flex-col gap-6">
            <PageHeader primaryText="Reports Center" secondaryText="Generate and export system-wide reports.">
                <ButtonGroup />
            </PageHeader>
            <div className="grid grid-cols-4 gap-4">
                <ReportCard>Daily Report</ReportCard>
                <ReportCard>Weekly Report</ReportCard>
                <ReportCard>Monthly Report</ReportCard>
                <ReportCard>Job Fair Report</ReportCard>
                <ReportCard>SPES Report</ReportCard>
                <ReportCard>Accreditation Report</ReportCard>
                <ReportCard>Transaction Summary</ReportCard>
            </div>
            <div>
                <BarChart options={sampleBarptions} data={smapleBarData}></BarChart>
            </div>
        </div>
    );
}

export default Reports;
