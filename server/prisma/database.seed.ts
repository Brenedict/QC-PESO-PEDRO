// PEDRO SHARED IMPORTS
import { TransactionCreateType } from "@qcpesopedro/shared/schema/transactions";
import {
    Demographic,
    Outcome,
    TransactionType,
    Role,
    Shift,
    ESSStatus,
    EnvironmentTag,
} from "@qcpesopedro/shared/prisma/enums";
import { ShiftLogUncheckedCreateInput, UserUncheckedCreateInput } from "@qcpesopedro/shared/prisma/models";

// Prisma.config
import prisma from "../src/config/prisma.config";

// Service
import TransactionService from "../src/service/transaction.service";

// Util
import HashUtil from "../src/utils/hash.util";

// Config
const START_HOUR = 8;
const END_HOUR = 17;
const START_DAY = 0; // 0 - Sunday
const END_DAY = 6; // 6 - Saturday

// ----------------------------- NAME POOLS --------------------------------------------

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

const transactionTypes = ["WALK_IN_REFERRAL", "ONLINE_REFERRAL", "IN_HOUSE_RECRUITMENT"] as TransactionType[];
const outcomes = ["PENDING", "MISMATCH", "SUCCESS", "NONE"] as Outcome[];

const demographics = [
    "FIRST_TIME_JOB_SEEKER",
    "PERSONS_WITH_DISABILITY",
    "SENIOR_CITIZEN",
    "YOUNG_WORKER",
    "WORK_IMMERSION_INTERNSHIP",
] as Demographic[];

const environmentTags = [
    "SLOW_INTERNET",
    "HEAVY_RAIN",
    "BROKEN_EQUIPMENT",
    "APPLICANT_ISSUES",
    "FEELING_UNWELL",
    "BROKEN_SOFTWARE_SYSTEM",
] as EnvironmentTag[];

const remarks = [
    null,
    "Referred to partner employer",
    "For verification",
    "Applicant requested follow-up",
    "Documents submitted",
    "Awaiting employer feedback",
];

// Random helpers
function randomItem<T>(array: readonly T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function withinWeekRange(date: Date): boolean {
    const day = date.getDay();
    return day >= START_DAY && day <= END_DAY;
}

function sameCalendarDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Walk back to the nearest weekday at midnight.
function getMostRecentBusinessDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    while (!withinWeekRange(d)) {
        d.setDate(d.getDate() - 1);
    }
    return d;
}

// A random past weekday (midnight).
function randomPastBusinessDay(minDaysBack: number, maxDaysBack: number): Date {
    let d: Date;
    do {
        const daysBack = randomInt(minDaysBack, maxDaysBack);
        d = new Date();
        d.setDate(d.getDate() - daysBack);
        d.setHours(0, 0, 0, 0);
    } while (!withinWeekRange(d));
    return d;
}

// Random time within business hours.
function randomBusinessDateTime(day: Date, startHour: number = START_HOUR, endHour: number = END_HOUR): Date {
    const d = new Date(day);
    const startMinutes = Math.min(startHour, END_HOUR) * 60;
    const endMinutes = Math.max(endHour * 60 - 1, startMinutes + 1);
    const totalMinutes = randomInt(startMinutes, endMinutes);
    d.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, randomInt(0, 59), 0);
    return d;
}

// Random datetime between two datetimes.
function randomDateBetween(start: Date, end: Date): Date {
    if (end.getTime() <= start.getTime()) return new Date(start);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomDemographics(): Demographic[] | undefined {
    // 58% chance of no demographics
    if (Math.random() > 0.42) {
        return undefined;
    }
    const shuffled = [...demographics].sort(() => Math.random() - 0.5);
    const count = Math.random() < 0.85 ? 1 : 2;
    return shuffled.slice(0, count);
}

// Users
interface SeedUserSpec {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    shift: Shift;
}

// Fixed roster: 1 superadmin, 2 admins, several frontline staff.
const userSpecs: SeedUserSpec[] = [
    {
        username: "john",
        email: "johndoe@gmail.com",
        firstName: "John",
        lastName: "Doe",
        role: "SUPERADMIN",
        shift: "NONE",
    },
    {
        username: "maria.santos",
        email: "maria.santos@qcpeso.gov.ph",
        firstName: "Maria",
        lastName: "Santos",
        role: "ADMIN",
        shift: "MORNING",
    },
    {
        username: "daniel.mendoza",
        email: "daniel.mendoza@qcpeso.gov.ph",
        firstName: "Daniel",
        lastName: "Mendoza",
        role: "ADMIN",
        shift: "AFTERNOON",
    },
    {
        username: "carlo.reyes",
        email: "carlo.reyes@qcpeso.gov.ph",
        firstName: "Carlo",
        lastName: "Reyes",
        role: "FRONTLINE",
        shift: "MORNING",
    },
    {
        username: "angela.cruz",
        email: "angela.cruz@qcpeso.gov.ph",
        firstName: "Angela",
        lastName: "Cruz",
        role: "FRONTLINE",
        shift: "MORNING",
    },
    {
        username: "miguel.garcia",
        email: "miguel.garcia@qcpeso.gov.ph",
        firstName: "Miguel",
        lastName: "Garcia",
        role: "FRONTLINE",
        shift: "MORNING",
    },
    {
        username: "sofia.bautista",
        email: "sofia.bautista@qcpeso.gov.ph",
        firstName: "Sofia",
        lastName: "Bautista",
        role: "FRONTLINE",
        shift: "AFTERNOON",
    },
    {
        username: "patrick.aquino",
        email: "patrick.aquino@qcpeso.gov.ph",
        firstName: "Patrick",
        lastName: "Aquino",
        role: "FRONTLINE",
        shift: "AFTERNOON",
    },
    {
        username: "camille.torres",
        email: "camille.torres@qcpeso.gov.ph",
        firstName: "Camille",
        lastName: "Torres",
        role: "FRONTLINE",
        shift: "AFTERNOON",
    },
];

async function buildUserDummy(spec: SeedUserSpec): Promise<UserUncheckedCreateInput> {
    return {
        username: spec.username,
        email: spec.email,
        password: await HashUtil.hashPassword("password123"),
        role: spec.role,
        shift: spec.shift,
        firstName: spec.firstName,
        lastName: spec.lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}

// Shift-day pool (today weighted heavily for dashboard activity).
function buildShiftDayPool(scatteredPastDays: number, todayWeight: number): Date[] {
    const today = getMostRecentBusinessDay(new Date());
    const pool: Date[] = [];

    for (let i = 0; i < todayWeight; i++) {
        pool.push(new Date(today));
    }

    for (let i = 0; i < scatteredPastDays; i++) {
        pool.push(randomPastBusinessDay(1, 15));
    }

    return pool;
}

// Shift logs
function buildShiftLog(userId: number, day: Date, verifierId?: number): ShiftLogUncheckedCreateInput {
    const today = getMostRecentBusinessDay(new Date());
    const isToday = sameCalendarDay(day, today) && sameCalendarDay(today, new Date());

    const timeIn = randomBusinessDateTime(day, START_HOUR, START_HOUR + 1);

    const stillOngoing = isToday && Math.random() < 0.35;

    const status: ESSStatus = stillOngoing
        ? "ONGOING"
        : randomItem(["APPROVED", "APPROVED", "APPROVED", "PENDING", "REVISION"] as ESSStatus[]);

    const isCompleted = status !== "ONGOING" && status !== "PENDING";

    const timeOut =
        status === "ONGOING"
            ? null
            : randomBusinessDateTime(day, Math.min(timeIn.getHours() + 3, END_HOUR - 1), END_HOUR);

    const lastVerifiedAt = isCompleted && timeOut ? randomDateBetween(timeOut, new Date()) : null;

    return {
        userId,
        status,
        timeIn,
        timeOut,
        lastVerifiedAt,
        verifierId: isCompleted ? verifierId : null,
        generalRemarks: null,
        adminRemarks: null,
        environmentTags: [randomItem(environmentTags)],
    };
}

// Transactions
function generateTransactionsForShift(
    userId: number,
    shiftLogId: number,
    count: number,
    windowStart: Date,
    windowEnd: Date
): TransactionCreateType[] {
    const transactions: TransactionCreateType[] = [];

    for (let i = 0; i < count; i++) {
        const applicantSex = randomItem(["MALE", "FEMALE"] as const);
        const firstName = applicantSex === "MALE" ? randomItem(maleFirstNames) : randomItem(femaleFirstNames);
        const lastName = randomItem(lastNames);

        transactions.push({
            applicantSex,
            userId,
            shiftLogId,
            applicantFirstName: firstName,
            applicantLastName: lastName,
            transactionOutcome: randomItem(outcomes),
            createdAt: randomDateBetween(windowStart, windowEnd),
            transactionType: randomItem(transactionTypes),
            remarks: randomItem(remarks),
            demographics: randomDemographics(),
        });
    }

    return transactions;
}

// Main

async function main() {
    try {
        // Delete order respects FK constraints.
        await prisma.transaction.deleteMany();
        await prisma.shiftLog.deleteMany();
        await prisma.accountLog.deleteMany();
        await prisma.auditLog.deleteMany();
        await prisma.user.deleteMany();

        // 1. Seed users.
        const createdUsers = [];
        for (const spec of userSpecs) {
            const dummyUserData = await buildUserDummy(spec);
            const user = await prisma.user.create({ data: dummyUserData });
            createdUsers.push(user);
        }

        // 2. Build shift-day pool (today only).
        const shiftDayPool = [getMostRecentBusinessDay(new Date())];
        const today = getMostRecentBusinessDay(new Date());

        // 3. Create shift logs + transactions.
        const allTransactions: TransactionCreateType[] = [];
        let shiftLogCount = 0;

        for (const user of createdUsers) {
            if (user.role === "SUPERADMIN") continue;

            const shiftCount = 1;
            for (let s = 0; s < shiftCount; s++) {
                const day = randomItem(shiftDayPool);
                const adminUsers = createdUsers.filter((user) => user.role === "ADMIN" || user.role === "SUPERADMIN");

                const verifier = randomItem(adminUsers);

                const shiftLog = await prisma.shiftLog.create({
                    data: buildShiftLog(user.id, day, verifier.id),
                });
                shiftLogCount++;

                const isToday = sameCalendarDay(day, today) && sameCalendarDay(today, new Date());
                // Today's shifts get more transactions.
                const txCount = isToday ? randomInt(15, 30) : randomInt(3, 12);

                const windowStart = shiftLog.timeIn;
                const windowEnd = shiftLog.timeOut ?? randomBusinessDateTime(day, windowStart.getHours() + 1, END_HOUR);

                allTransactions.push(
                    ...generateTransactionsForShift(user.id, shiftLog.id, txCount, windowStart, windowEnd)
                );
            }
        }

        allTransactions.sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

        await TransactionService.createTransactionsWithCode(allTransactions);

        console.log(
            `Seeded ${createdUsers.length} users, ${shiftLogCount} shift logs, and ${allTransactions.length} transactions.`
        );
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
