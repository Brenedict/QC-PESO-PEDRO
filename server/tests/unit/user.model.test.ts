import userModel from "../../src/models/user.model";
import prisma from "../../src/config/prisma.config";
import type { User } from "../../generated/prisma/client";
import { afterEach, describe, expect, jest, test } from "@jest/globals";

jest.mock("../../src/config/prisma.config", () => ({
    user: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
    },
}));

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

const mockUser: User = {
    id: 1,
    username: "john",
    email: "johndoe@gmail.com",
    password: "password123",
} as User;

describe("user.model – unit tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("getById returns a user when found", async () => {
        mockedPrisma.user.findUnique.mockResolvedValueOnce(mockUser);

        const result = await userModel.getById(42);
        expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: 42 },
        });
        expect(result).toEqual(mockUser);
    });

    test("getById returns null when not found", async () => {
        mockedPrisma.user.findUnique.mockResolvedValueOnce(null);

        const result = await userModel.getById(999);
        expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: 999 },
        });
        expect(result).toBeNull();
    });

    test("getByEmail returns a user when found", async () => {
        mockedPrisma.user.findFirst.mockResolvedValueOnce(mockUser);

        const result = await userModel.getByEmail("johndoe@gmail.com");
        expect(mockedPrisma.user.findFirst).toHaveBeenCalledWith({
            where: { email: "johndoe@gmail.com" },
        });
        expect(result).toEqual(mockUser);
    });

    test("getByEmail returns null when not found", async () => {
        mockedPrisma.user.findFirst.mockResolvedValueOnce(null);

        const result = await userModel.getByEmail("missing@example.com");
        expect(mockedPrisma.user.findFirst).toHaveBeenCalledWith({
            where: { email: "missing@example.com" },
        });
        expect(result).toBeNull();
    });
});
