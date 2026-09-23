import type { NextFunction, Request, Response } from "express";


interface RequestLog {
    method: string,
    status: number,
    path: string,
    duration: number
}

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {

    const start = Date.now();

    res.on("finish", () => {
        const reqLog: RequestLog = {
            method: req.method,
            status: res.statusCode,
            path: req.originalUrl,
            duration: Date.now() - start
        };
        console.log(reqLog);
    });

    next();
}