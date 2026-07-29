import { Card } from "./Card";
import { CardHeader, Divider, FemaleText, MaleText, NumberText, NumberTitle } from "./DashboardCard";

import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

export interface JobFairParticipantsProps {
    title: string;

    registered: number;
    registeredMale: number;
    registeredFemale: number;

    hired: number;
    hiredMale: number;
    hiredFemale: number;
}

export function JobFairParticipants({
    title,
    registered,
    registeredMale,
    registeredFemale,
    hired,
    hiredMale,
    hiredFemale,
}: JobFairParticipantsProps) {
    return (
        <Card className="w-full">
            <Card.Body variant="white" className="p-5!">
                <CardHeader icon={PeopleOutlineOutlinedIcon}>{title}</CardHeader>

                <Divider />
                <section className="grid grid-cols-2 gap-8">
                    <div>
                        <NumberTitle>Registered</NumberTitle>
                        <NumberText>{registered}</NumberText>

                        <div className="flex  mt-2 ">
                            <MaleText className="w-fit!">{registeredMale}</MaleText>
                            <span className="ml-1.5">|</span>
                            <FemaleText className="w-fit!">{registeredFemale}</FemaleText>
                        </div>
                    </div>

                    <div>
                        <NumberTitle>hired</NumberTitle>
                        <NumberText>{hired}</NumberText>

                        <div className="flex  mt-3 text-sm">
                            <MaleText className="w-fit!">{hiredMale}</MaleText>
                            <span className="ml-1.5">|</span>
                            <FemaleText className="w-fit!">{hiredFemale}</FemaleText>
                        </div>
                    </div>
                </section>
            </Card.Body>
        </Card>
    );
}
