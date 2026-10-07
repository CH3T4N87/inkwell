// src/modules/users/routes.ts — also a factory, not a ready-made router:

import type { Router, Request, Response, NextFunction } from "express";
import type { User } from "./schema.js";
import express from "express";
import { createUserRepo } from "./repo.js";
import { createUserService } from "./service.js";
import { createAppError } from "../../errors/app-error.js";

// createUsersRouter(store: Map<string, User>): Router — builds the repo, builds the service, builds an express.Router(), 
// wires GET /,

//  DELETE /:id
//  to the service, returns the router.
// Handlers are async, await the service calls, no try/catch — let Express 5 forward the throws.
// POST returns 201, everything else 200.

export const createUsersRouter = (store: Map<string, User>): Router => {

    const repo = createUserRepo(store);
    const service = createUserService(repo);
    const userRouter = express.Router();

    //GET
    userRouter.get("/", async (req: Request, res: Response) => {
        const users = await service.listUsers();
        res.status(200).json(users);
    });

    //  GET /:id
    userRouter.get("/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!id) {
            return next(createAppError(400, "id param is required"));
        }
        const user = await service.getUser(id);
        res.status(200).json(user);
    })

    //  POST /,
    userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
        const { name, email } = req.body;
        if (!name || !email) {
            return next(createAppError(400, "name and email are required"));
        }
        const user = await service.createUser({ name, email });
        res.status(201).json(user);
    })

    //DELETE
    userRouter.delete("/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!id) {
            return next(createAppError(400, "id param is required"))
        }
        await service.deleteUser(id);
        return res.status(200).json({
            message: "user has been deleted successfully"
        });
    })

    return userRouter;
}