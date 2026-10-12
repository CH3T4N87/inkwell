import { createInMemoryRepository } from "../../shared/repository.js";
import type { NewUser, User } from "./schema.js";

export const createUserRepo = (store: Map<string, User>) => {
    const genericRepo = createInMemoryRepository(store);

    const findAll = () => genericRepo.findAll();

    const findById = (id: string) => genericRepo.findById(id);

    const findByEmail = async (email: string): Promise<User | undefined> => {
        const users = await genericRepo.findAll();
        return users.find((user) => user.email === email);
    };

    const create = (input: NewUser) => genericRepo.create(input);

    const remove = (id: string) => genericRepo.remove(id);

    return {
        findAll,
        findById,
        findByEmail,
        create,
        remove,
    };
};

export type UserRepo = ReturnType<typeof createUserRepo>;
