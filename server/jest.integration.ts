import prisma from "./src/config/prisma.config";
import "./src/config/passport.config";

afterAll(async () => {
    await prisma.$disconnect();
});
