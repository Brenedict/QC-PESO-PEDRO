import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Card } from "../components/Card";
import Icon from "../components/Icon";
import type { MouseEventHandler, ReactNode } from "react";
import { Text } from "../components/Text";

function ReportCard({ children, onClick }: { children: ReactNode; onClick?: MouseEventHandler<HTMLDivElement> }) {
    return (
        <Card onClick={onClick}>
            <Card.Body className="bg-transparent! gap-5! p-5!">
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

                <Text align="center" weight="bold" variant="dark-blue" size="description">
                    {children}
                </Text>
            </Card.Body>
        </Card>
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
        <div className="min-h-screen">
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
        </div>
    );
}

export default Reports;
