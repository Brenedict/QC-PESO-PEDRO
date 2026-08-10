import prisma from "../config/prisma";

class UserModel {
    public async getUserById(id: number) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    public async getUserByEmail(email: string) {
        return prisma.user.findFirst({
            where: {
                email,
            },
        });
    }
}

export default new UserModel();
