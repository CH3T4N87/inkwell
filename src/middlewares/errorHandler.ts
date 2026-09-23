import type { NextFunction, Request, Response } from "express";
import { isAppError } from "../errors/app-error.js";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (isAppError(err)) {
        return res.status(err.status).json({
            message: err.message,
        });
    }

    console.error(err);

    return res.status(500).json({
        message: "Internal Server Error",
    });
};