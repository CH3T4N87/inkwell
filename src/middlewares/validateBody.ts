import type { RequestHandler, Request } from "express";
import type z from "zod";
import { createAppError } from "../errors/app-error.js";

export const validateBody = <S extends z.ZodType>(schema: S): RequestHandler<Request["params"], unknown, z.infer<S>> => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const messages = result.error.issues
                .map((zodIssue) => {
                    const field = zodIssue.path.length
                        ? zodIssue.path.join(".")
                        : "body";

                    return `${field}: ${zodIssue.message}`;
                })
                .join(", ");
            return next(createAppError(400, messages));
        }
        req.body = result.data;
        next();
    }
}