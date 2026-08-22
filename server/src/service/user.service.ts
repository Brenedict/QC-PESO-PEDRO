// PEDRO SHARED IMPORTS
import type { Prisma, Role, Status, User } from "@qcpesopedro/shared/prisma/client";

// Models
import UserModel from "../models/user.model";
import ShiftModel from "../models/shift.model";
import DateUtil from "../utils/date.util";

export interface UserManagementFilter {
    role?: Role;
    status?: "ACTIVE" | "INACTIVE";
    search?: string;
}

export default {
    generateTemporaryPassword(firstName: string, lastName: string): string {
        const isoDate = new Date().toISOString().split("T")[0];
        const temporaryPassword = `QCPESO-${firstName.toUpperCase().split(" ").join("")}-${lastName.toUpperCase().split(" ").join("")}-${isoDate}`;

        return temporaryPassword;
    },

    async getUsers(filters: UserManagementFilter) {
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

        return UserModel.getUsers({ where });
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

        user.password = generatedTemporaryPassword;

        return await UserModel.createUser(user);
    },

    async resetPassword(userId: number, user: User): Promise<User | null> {
        const generatedTemporaryPassword = this.generateTemporaryPassword(user.firstName, user.lastName);

        const updatedUser = {
            password: generatedTemporaryPassword,
        } as User;

        return await UserModel.updateUser(userId, updatedUser);
    },

    async getRecentUnfinishedShifts(userId: number) {
        const { startDate, endDate } = DateUtil.buildDayRange(new Date());

        return ShiftModel.getShiftLogsByUserId(
            userId,
            { timeOut: null, timeIn: { gte: startDate, lte: endDate } },
            { timeIn: "desc" }
        );
    },

    async getMostRecentUnfinishedShiftId(userId: number) {
        return (await this.getRecentUnfinishedShifts(userId))?.[0]?.id;
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
