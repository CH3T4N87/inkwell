import { createInMemoryRepository } from "../../shared/repository.js";
import type { User } from "./schema.js";

export const createUserRepo = (store: Map<string, User>) => {
    const genericRepo = createInMemoryRepository(store);

    const findByEmail = async (email: string): Promise<User | undefined> => {
        const users = await genericRepo.findAll();
        return users.find((user) => user.email === email);
    };

    return {
        ...genericRepo,
        findByEmail,
    };
};

export type UserRepo = ReturnType<typeof createUserRepo>;
