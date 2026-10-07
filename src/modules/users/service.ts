import { createAppError } from "../../errors/app-error.js";
import type { UserRepo } from "./repo.js";
import type { NewUser, User } from "./schema.js";

export const createUserService = (repo: UserRepo) => {
    const getUser = async (id: string): Promise<User> => {
        const user = await repo.findById(id);

        if (!user) {
            throw createAppError(404, "user not found");
        }

        return user;
    };

    const listUsers = async (): Promise<User[]> => {
        return repo.findAll();
    };

    const createUser = async (input: NewUser): Promise<User> => {
        return repo.create(input);
    };

    const deleteUser = async (id: string): Promise<void> => {
        const deleted = await repo.remove(id);

        if (!deleted) {
            throw createAppError(404, "user not found");
        }
    };

    return {
        getUser,
        listUsers,
        createUser,
        deleteUser,
    };
};

export type UserService = ReturnType<typeof createUserService>;
