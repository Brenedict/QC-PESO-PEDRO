import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport";

export default {
    get: [
        jwtAccessAuth,
        (_req: Request, res: Response) => {
            console.log("Trigger");
            res.json("This is the transaction route");
        },
    ],

    post: [
        jwtAccessAuth,
        (req: Request, res: Response) => {
            console.log(req.body); // For testing: returns sent request body
            res.status(201).json(req.body);
        },
    ],

    patch: [
        jwtAccessAuth,
        (req: Request, res: Response) => {
            console.log(req.body); // For testing: returns sent request body
            res.status(201).json(req.body);
        },
    ],

    delete: [
        jwtAccessAuth,
        (_req: Request, res: Response) => {
            res.status(204).end();
        },
    ],
};
