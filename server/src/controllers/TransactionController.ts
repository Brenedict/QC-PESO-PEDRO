import type { NextFunction, Request, Response } from "express";

export default {
    get(_req: Request, res: Response) {
        console.log("Trigger");
        res.json("This is the transaction route");
    },

    post(req: Request, res: Response) {
        console.log(req.body); // For testing: returns sent request body
        res.status(201).json(req.body);
    },
};
