import express, { type Request, type Response } from "express";
import { requestLogger } from "./middlewares/requestLogger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requireHeader } from "./middlewares/requireHeader.js";
import type { User } from "./modules/users/schema.js";
import { createUsersRouter } from "./modules/users/routes.js";
import { createUserRepo } from "./modules/users/repo.js";
import { createUserService } from "./modules/users/service.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

//routes

app.get("/health", requireHeader("x-api-key"), (req: Request, res: Response) => {
    res.json({
        "status": "ok",
        "project": "inkwell"
    })
});

const usersStore = new Map<string, User>();
const usersRepo = createUserRepo(usersStore);
const usersService = createUserService(usersRepo)
app.use("/users", createUsersRouter(usersService));

app.use(notFound);
app.use(errorHandler);

export default app;