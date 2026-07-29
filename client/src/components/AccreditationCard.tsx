import { Card } from "./Card";
import { CardHeader, Divider, NumberText, NumberTitle } from "./DashboardCard";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

interface AccreditationCardProps {
    title: string;
    total: number;
    newCount: number;
    renewalCount: number;
}
export function AccreditationCard({ title, total, newCount, renewalCount }: AccreditationCardProps) {
    return (
        <Card className="w-full">
            <Card.Body variant="white" className="p-5!">
                <CardHeader icon={PeopleOutlineOutlinedIcon}>{title}</CardHeader>
                <Divider />

                <NumberTitle>total accredited</NumberTitle>
                <NumberText>{total}</NumberText>
                <Divider />

                <div className="flex justify-between mt-6 text-description text-grayish-blue">
                    <span>
                        New: <span className="font-bold">{newCount}</span>
                    </span>
                    <span>
                        Renewal: <span className="font-bold">{renewalCount}</span>
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
}
