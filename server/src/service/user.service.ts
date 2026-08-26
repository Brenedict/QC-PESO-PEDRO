// General Imports

// PEDRO SHARED IMPORTS
import type { Prisma, Role, User } from "@qcpesopedro/shared/prisma/client";

// Models
import UserModel from "../models/user.model";
import ShiftModel from "../models/shift.model";
import DateUtil from "../utils/date.util";
import type { ShiftLogWhereInput, UserFindManyArgs } from "@qcpesopedro/shared/prisma/models";

// Utils
import HashUtil from "../utils/hash.util";

export interface UserManagementFilter {
    role?: Role;
    status?: "ACTIVE" | "INACTIVE";
    search?: string;
}

export default {
    generateTemporaryPassword(firstName: string, lastName: string): string {
        const localeDate = new Date().toLocaleDateString("sv-SE");
        const temporaryPassword = `QCPESO-${firstName.toUpperCase().split(" ").join("")}-${lastName.toUpperCase().split(" ").join("")}-${localeDate}`;

        return temporaryPassword;
    },

    async getUsers(filters: UserManagementFilter, args?: UserFindManyArgs) {
        const where: Prisma.UserWhereInput = {};

        if (filters.role) {
            where.role = filters.role;
        }
        if (filters.status) {
            where.status = filters.status === "ACTIVE" ? "ONLINE" : { not: "ONLINE" };
        }

        if (filters.search) {
            where.fullName = { contains: filters.search as string, mode: "insensitive" };
        }

        return UserModel.getUsers({ where: { ...where, ...args?.where }, ...args });
    },

    async ensureUserExist(userId: number): Promise<User | null> {
        return await UserModel.getById(userId);
    },

    async usernameExist(username: string): Promise<User | null> {
        return await UserModel.getByUsername(username);
    },

    async emailExist(email: string): Promise<User | null> {
        return await UserModel.getByEmail(email);
    },

    async updateUser(userId: number, user: User): Promise<User | null> {
        return await UserModel.updateUser(userId, user);
    },

    async createUser(user: User): Promise<User | null> {
        const generatedTemporaryPassword = this.generateTemporaryPassword(user.firstName, user.lastName);
        const hashedPassword = await HashUtil.hashPassword(generatedTemporaryPassword);

        user.password = hashedPassword;

        return await UserModel.createUser(user);
    },

    async resetPassword(userId: number, user: User): Promise<User | null> {
        const generatedTemporaryPassword = this.generateTemporaryPassword(user.firstName, user.lastName);
        const hashedPassword = await HashUtil.hashPassword(generatedTemporaryPassword);

        const updatedUser = {
            password: hashedPassword,
        } as User;

        return await UserModel.updateUser(userId, updatedUser);
    },

    async changePassword(userId: number, newPassword: string): Promise<User | null> {
        const hashedPassword = await HashUtil.hashPassword(newPassword);
        const updatedUser = {
            password: hashedPassword,
        } as User;

        return await UserModel.updateUser(userId, updatedUser);
    },

    async getRecentShifts(userId: number, where?: ShiftLogWhereInput) {
        const { startDate, endDate } = DateUtil.buildDayRange(new Date());

        return ShiftModel.getShiftLogsByUserId(
            userId,
            { ...where, timeIn: { gte: startDate, lte: endDate } },
            { timeIn: "desc" }
        );
    },

    async getMostRecentUnfinishedShift(userId: number) {
        return (await this.getRecentShifts(userId, { timeOut: null, status: "ONGOING" }))?.[0];
    },

    async hasFinishedShiftToday(userId: number): Promise<boolean> {
        const { startDate, endDate } = DateUtil.buildDayRange(new Date());

        return (
            (
                await ShiftModel.getShiftLogsByUserId(userId, {
                    status: { not: "ONGOING" },
                    timeIn: { gte: startDate, lte: endDate },
                })
            ).length >= 0
        );
    },

    async getActiveAndInactiveCount() {
        const overall = await UserModel.groupBy({ by: ["status"] });
        const active = overall.reduce((total, user) => (user.status === "ONLINE" ? total + 1 : total), 0);
        const inactive = overall.reduce((total, user) => (user.status !== "ONLINE" ? total + 1 : total), 0);

        return { active, inactive };
    },

    async getRolesCount() {
        const overall = await UserModel.groupBy({ by: ["status"] });
        return overall.length;
    },
};
