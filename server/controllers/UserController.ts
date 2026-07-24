import type { NextFunction, Request, Response } from "express";

export default {
    get(_req: Request, res: Response) {
        res.send("This is the user route");
    },
};
