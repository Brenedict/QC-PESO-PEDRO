// General Imports
import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export default {
    notFoundError(_req: Request, res: Response) {
        res.status(404).json({ message: "404 Endpoint Not Found" });
    },
    internalError(error: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) {
        console.error(error);
        res.status(500).json({ error, message: "500 Internal Server Error" });
    },
};
