import { Card } from "./Card";
import { CardHeader, Divider, FemaleText, MaleText, NumberText, NumberTitle } from "./DashboardCard";

import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

interface WHIPCardProps {
    title: string;
    totalparticipants: number;
    male: number;
    female: number;
}
export function WHIPCard({ title, totalparticipants, male, female }: WHIPCardProps) {
    return (
        <Card className="w-full">
            <Card.Body variant="white" className="p-5!">
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
