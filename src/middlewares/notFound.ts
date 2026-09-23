import type { NextFunction, Request, Response } from "express";
import { createAppError } from "../errors/app-error.js";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = createAppError(404, `Route not found: ${req.method} ${req.originalUrl}`)
    next(error);
}