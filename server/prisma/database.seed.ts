import { TransactionCreateType } from "@qcpesopedro/shared/schema/transactions";
import prisma from "../src/config/prisma.config";
import TransactionService from "../src/service/transaction.service";
import { Demographic } from "@qcpesopedro/shared/prisma/enums";
import { ShiftLogUncheckedCreateInput, UserUncheckedCreateInput } from "@qcpesopedro/shared/prisma/models";

// prettier-ignore
const maleFirstNames = [ "Juan", "Mark", "John", "Carlo", "Miguel", "Angelo", "Joshua", "Daniel", "Christian", "Gabriel", "Adrian",
    "Paolo", "Rafael", "Kevin", "James", "Nathan", "Francis", "Michael", "Jerome", "Luis", "Jose", "Renz", "Jayson", "Patrick", "Kenneth",
    "Ronald", "Emmanuel", "Vincent", "Alvin", "Bryan", 
];

// prettier-ignore
const femaleFirstNames = [
    "Maria", "Angela", "Sofia", "Andrea", "Patricia", "Nicole", "Jasmine", "Christine", "Camille", "Alyssa", "Gabrielle", "Bianca", "Danica",
    "Hannah", "Mikaela", "Katrina", "Beatrice", "Clarisse", "Elaine", "Trisha", "Catherine", "Angelica", "Mary", "Karen", "Janine", "Kimberly",
    "Joyce", "Rhea", "Shaira", "Mia", 
];

// prettier-ignore
const lastNames = [ "Dela Cruz", "Santos", "Reyes", "Garcia", "Mendoza", "Bautista", "Aquino", "Castillo", "Rivera", "Navarro", "Gonzales", "Flores",
    "Ramos", "Torres", "Villanueva", "Fernandez", "Cruz", "Pascual", "Mercado", "Salazar", "Manalo", "Santiago", "Aguilar", "Diaz", "Domingo", "Castro",
    "Valdez", "Francisco", "Soriano", "Lim", "Tan", "Chua", "Sy", "David", "De Leon", "Ocampo", "Padilla", "Rosales", "Tolentino", "Miranda", 
];

const transactionTypes = ["WALK_IN_REFERRAL", "ONLINE_REFERRAL", "IN_HOUSE_RECRUITMENT"] as const;
const outcomes = ["PENDING", "MISMATCH", "SUCCESS", "NONE"] as const;

const demographics = [
    "FIRST_TIME_JOB_SEEKER",
    "PERSONS_WITH_DISABILITY",
    "SENIOR_CITIZEN",
    "YOUNG_WORKER",
    "WORK_IMMERSION_INTERNSHIP",
] as const;

const remarks = [
    null,
    "Referred to partner employer",
    "For verification",
    "Applicant requested follow-up",
    "Documents submitted",
    "Awaiting employer feedback",
];

export const userDummy: UserUncheckedCreateInput = {
    username: "john",
    email: "johndoe@gmail.com",
    password: "password123",
    role: "ADMIN",
    status: "ONLINE",
    shift: "MORNING",
    firstName: "John",
    lastName: "Doe",
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const shiftDummy = (userId: number): ShiftLogUncheckedCreateInput => ({
    userId,
    status: "PENDING",
    timeIn: new Date(),
    timeOut: new Date(),
    generalRemarks: null,
    adminRemarks: null,
    lastVerifiedBy: "someone",
    lastVerifiedAt: new Date(),
    environmentTags: ["APPLICANT_ISSUES"],
});

function randomItem<T>(array: readonly T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomDemographics(): Demographic[] | undefined {
    // 58% have no demographic classification
    if (Math.random() > 0.42) {
        return undefined;
    }

    const shuffled = [...demographics].sort(() => Math.random() - 0.5);

    // Usually one demographic, occasionally two
    const count = Math.random() < 0.85 ? 1 : 2;

    return shuffled.slice(0, count);
}

export function generateTransactions(userId: number, shiftLogId: number, count: number): TransactionCreateType[] {
    const transactions: TransactionCreateType[] = [];

    const startDate = new Date("2026-08-16T08:00:00");
    const endDate = new Date();

    for (let i = 0; i < count; i++) {
        const applicantSex = randomItem(["MALE", "FEMALE"] as const);
        const firstName = applicantSex === "MALE" ? randomItem(maleFirstNames) : randomItem(femaleFirstNames);
        const lastName = randomItem(lastNames);
        const outcome = randomItem(outcomes);
        const transactionType = randomItem(transactionTypes);

        const transaction: TransactionCreateType = {
            applicantSex,
            userId,
            shiftLogId,
            applicantFirstName: firstName,
            applicantLastName: lastName,
            transactionOutcome: outcome,
            createdAt: randomDate(startDate, endDate),
            transactionType,
            remarks: randomItem(remarks),
            demographics: randomDemographics(),
        };

        transactions.push(transaction);
    }

    // Sort chronologically
    transactions.sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

    return transactions;
}

async function main() {
    try {
        await prisma.transaction.deleteMany();
        await prisma.shiftLog.deleteMany();
        await prisma.user.deleteMany();

        const user = await prisma.user.create({ data: userDummy });
        const shift = await prisma.shiftLog.create({ data: shiftDummy(user.id) });

        const generated = generateTransactions(user.id, shift.id, 1000);
        await TransactionService.createTransactionsWithCode(generated);
    } catch (err) {
        console.log(err);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
