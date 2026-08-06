import { Card } from "./Card";
import { CardHeader, Divider, FemaleText, MaleText, NumberText, NumberTitle } from "./DashboardCard";

import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

interface WHIPCardProps {
    title: string;
    totalparticipants: number;
    male: number;
    female: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export function WHIPCard({ title, totalparticipants, male, female, onClick }: WHIPCardProps) {
    return (
        <Card className="w-full" onClick={onClick}>
            <Card.Body className="bg-transparent! p-5!">
                <CardHeader icon={PeopleOutlineOutlinedIcon}>{title}</CardHeader>
                <Divider />

                <NumberTitle>Total Participants</NumberTitle>
                <NumberText>{totalparticipants}</NumberText>

                <Divider />

                <div className="flex justify-between mt-6">
                    <MaleText>
                        <span className="mr-2">Male</span>
                        <span className="text-black font-bold">{male}</span>
                    </MaleText>

                    <FemaleText className="grow-0 justify-end!">
                        <span className="mr-2">Female</span>
                        <span className="text-black font-bold">{female}</span>
                    </FemaleText>
                </div>
            </Card.Body>
        </Card>
    );
}
