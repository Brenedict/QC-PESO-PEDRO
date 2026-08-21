// Components
import { Card } from "./Card";
import { CardHeader, Divider, FemaleText, MaleText, NumberText, NumberTitle } from "./DashboardCard";

// Material UI Icons
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

export interface JobFairParticipantsProps {
    title: string;

    registered: number;
    registeredMale: number;
    registeredFemale: number;

    hired: number;
    hiredMale: number;
    hiredFemale: number;

    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function JobFairParticipants({
    title,
    registered,
    registeredMale,
    registeredFemale,
    hired,
    hiredMale,
    hiredFemale,
    onClick,
}: JobFairParticipantsProps) {
    return (
        <Card className="w-full" onClick={onClick}>
            <Card.Body className="bg-transparent! p-5!">
                <CardHeader icon={BusinessCenterOutlinedIcon}>{title}</CardHeader>

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
