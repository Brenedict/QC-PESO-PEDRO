// General Imports
import { Prisma, type User } from "@qcpesopedro/shared/prisma/client";

// Prisma.config
import prisma from "../config/prisma.config";

// Service
import { type UserManagementFilter } from "../service/user.service";
import type {
    UserCountArgs,
    UserCreateInput,
    UserDeleteArgs,
    UserDeleteManyArgs,
    UserFindManyArgs,
    UserGroupByArgs,
} from "@qcpesopedro/shared/prisma/models";

export default {
    async createUser(user: User | UserCreateInput): Promise<User | null> {
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

    async getByResetToken(resetToken: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                resetToken: resetToken,
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

    async getUsers(args: UserFindManyArgs): Promise<User[] | null> {
        return prisma.user.findMany(args);
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

    async deleteUsers(args?: UserDeleteManyArgs) {
        return prisma.user.deleteMany(args);
    },

    async count(args?: UserCountArgs) {
        return prisma.user.count(args);
    },

    async groupBy(args: UserGroupByArgs) {
        // eslint-disable-next-line
        // @ts-ignore
        return prisma.user.groupBy(args);
    },
};
