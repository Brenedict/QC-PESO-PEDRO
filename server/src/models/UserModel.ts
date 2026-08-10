import { type User } from "../../generated/prisma/client";
import prisma from "../config/prisma";

class UserModel {
    public async getById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    public async getByEmail(email: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: {
                email,
            },
        });
    }
}

export default new UserModel();
