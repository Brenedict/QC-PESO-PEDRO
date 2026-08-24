// PEDRO SHARED IMPORTS
import type { Role, Status, User } from "@qcpesopedro/shared/prisma/client";

// Models
import UserModel from "../models/user.model";
import ShiftModel from "../models/shift.model";

// Utils
import HashUtil from "../utils/hash.util";

export interface UserManagementFilter {
    role?: Role | undefined;
    status?: Status | undefined;
}

export default {
    generateTemporaryPassword(firstName: string, lastName: string): string {
        const isoDate = new Date().toISOString().split("T")[0];
        const temporaryPassword = `QCPESO-${firstName.toUpperCase().split(" ").join("")}-${lastName.toUpperCase().split(" ").join("")}-${isoDate}`;

        return temporaryPassword;
    },

    async getUsers(filters: UserManagementFilter) {
        return UserModel.getUsersWithFilters(filters);
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

    async getRecentUnfinishedShifts(userId: number) {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        return ShiftModel.getShiftLogsByUserId(
            userId,
            { timeOut: null, timeIn: { gte: start, lte: end } },
            { timeIn: "desc" }
        );
    },

    async getMostRecentUnfinishedShiftId(userId: number) {
        return (await this.getRecentUnfinishedShifts(userId))?.[0]?.id;
    },
};
