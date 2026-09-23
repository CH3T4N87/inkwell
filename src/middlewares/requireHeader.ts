import type { RequestHandler } from "express";
import { createAppError } from "../errors/app-error.js";

export const requireHeader = (name: string): RequestHandler => {
    return (req, res, next) => {
        if(!req.headers[name.toLowerCase()]){
          return next(createAppError(400, `Missing required header: ${name}`));
        }
        next();
    }
}