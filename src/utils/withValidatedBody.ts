import type { RequestHandler, Request } from "express";
import type z from "zod";
import { validateBody } from "../middlewares/validateBody.js";


// Safe only because Express executes the validator first and calls the typed handler only when validation succeeds.

export const withValidateBody = <S extends z.ZodType>(
    schema: S,
    handler: RequestHandler<Request["params"], unknown, z.infer<S>>
) => {
    const typedHandler: RequestHandler = (req, res, next) => {
        return handler(req, res, next);
    };

    return [validateBody(schema), typedHandler] as const;
};