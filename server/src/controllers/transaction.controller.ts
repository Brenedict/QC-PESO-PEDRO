import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { requireAccessLevel } from "../middlewares/authorized.middleware";
import { AccessLevel } from "@qcpesopedro/shared/prisma/accessLevel";

export default {
    get: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        (_req: Request, res: Response) => {
            res.json("This is the transaction route");
        },
    ],

    post: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        (req: Request, res: Response) => {
            console.log(req.body); // For testing: returns sent request body
            res.status(201).json(req.body);
        },
    ],

    patch: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        (req: Request, res: Response) => {
            console.log(req.body); // For testing: returns sent request body
            res.status(201).json(req.body);
        },
    ],

    delete: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        (_req: Request, res: Response) => {
            res.status(204).end();
        },
    ],
};
