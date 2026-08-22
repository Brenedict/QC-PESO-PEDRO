import request from "supertest";
import { app } from "../../jest.integration";
import shiftRoute from "../../src/routes/shift.route";

describe("Shift Route", () => {
    app.use("/shift", shiftRoute);

    it("gets overall shift and its details", async () => {
        const res = await request(app).get("/shift").expect(200);

        expect(res.body).toHaveProperty("shifts");
    });
});
