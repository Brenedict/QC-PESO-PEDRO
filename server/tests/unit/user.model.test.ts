import userModel from "../../src/models/user.model";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import { prismaMock } from "../../jest.unit";
import { mockUser } from "../fixtures/user.fixture";

describe("user model", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns a user when get by id", async () => {
        prismaMock.user.findUnique.mockResolvedValueOnce(mockUser);

        const result = await userModel.getById(42);
        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
            where: { id: 42 },
        });
        expect(result).toEqual(mockUser);
    });

    it("returns null when not get by id", async () => {
        prismaMock.user.findUnique.mockResolvedValueOnce(null);

        const result = await userModel.getById(999);
        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
            where: { id: 999 },
        });
        expect(result).toBeNull();
    });

    it("returns a user when get by email", async () => {
        prismaMock.user.findFirst.mockResolvedValueOnce(mockUser);

        const result = await userModel.getByEmail("johndoe@gmail.com");
        expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
            where: { email: "johndoe@gmail.com" },
        });
        expect(result).toEqual(mockUser);
    });

    it("returns null when not get by email", async () => {
        prismaMock.user.findFirst.mockResolvedValueOnce(null);

        const result = await userModel.getByEmail("missing@example.com");
        expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
            where: { email: "missing@example.com" },
        });
        expect(result).toBeNull();
    });
});
