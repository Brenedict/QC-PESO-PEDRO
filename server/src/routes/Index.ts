import type { ErrorRequestHandler, Request, Response } from "express";
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send("Default route");
});

router.use("/", (err: ErrorRequestHandler, _req: Request, _res: Response) => {
    console.error(err);
});

export default router;
