import { CardHeader } from "../components/DashboardCard";
import type { MaterialIcon } from "../types/common";
import { Card } from "./Card";
import { Divider, FemaleText, MaleText, NumberText, NumberTitle, PercentageChange } from "./DashboardCard";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

interface StatsCardProps {
    title: string;
    total: number;
    male: number;
    female: number;
    previous: number;
    className?: string;
    specialIcon?: MaterialIcon;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function StatsCard({ title, total, male, female, previous, className, specialIcon, onClick }: StatsCardProps) {
    return (
        <Card className={`w-full ${className ?? ""}`} onClick={onClick}>
            <Card.Body className="bg-transparent! p-5!">
                <CardHeader icon={specialIcon || PeopleOutlineOutlinedIcon}>{title}</CardHeader>
                <Divider />

                <NumberTitle>TOTAL</NumberTitle>
                <NumberText>{total}</NumberText>

                <Divider />

                <div className="flex justify-between">
                    <MaleText>
                        <span className="mr-2">Male</span>
                        <span className="text-black font-bold">{male}</span>
                    </MaleText>

                    <FemaleText className="grow-0 justify-end!">
                        <span className="mr-2">Female</span>
                        <span className="text-black font-bold">{female}</span>
                    </FemaleText>
                </div>

                <PercentageChange current={total} previous={previous} />
            </Card.Body>
        </Card>
    );
}
