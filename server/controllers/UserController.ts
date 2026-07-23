import type { Request, Response } from "express";

export default {
    get(_req: Request, res: Response) {
        res.send("This is the user route");
    },
};
