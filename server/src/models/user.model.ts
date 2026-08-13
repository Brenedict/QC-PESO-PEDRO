// General Imports
import { Prisma, type User } from "@qcpesopedro/shared/prisma/client";
import prisma from "../config/prisma.config";

// Service
import { type UserManagementFilter } from "../service/user.service";

export default {
    async createUser(user: User): Promise<User | null> {
        return prisma.user.create({
            data: user,
        });
    },

    async getById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    },

    async getByEmail(email: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: {
                email,
            },
        });
    },
    async getByUsername(username: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: {
                username,
            },
        });
    },

    async getUsersWithFilters(filters: UserManagementFilter): Promise<User[] | null> {
        const where: Prisma.UserWhereInput = {};

        if (filters.role) {
            where.role = filters.role;
        }
        if (filters.status) {
            where.status = filters.status;
        }

        return prisma.user.findMany({ where });
    },

    async updateUser(userId: number, user: User): Promise<User | null> {
        return prisma.user.update({
            where: {
                id: userId,
            },
            data: user,
        });
    },

    async deleteById(id: number): Promise<User | null> {
        return prisma.user.delete({
            where: {
                id,
            },
        });
    },
};
