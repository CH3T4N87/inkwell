import type { NewUser, User } from "./schema.js";

export const createUserRepo = (store: Map<string, User>) => {

    const findById = async (id: string): Promise<User | undefined> => {
        return store.get(id);
    }

    const findAll = async (): Promise<User[]> => {
        return [...store.values()]
    }

    const create = async (input: NewUser): Promise<User> => {
        const newUser: User = {
            id: crypto.randomUUID(),
            name: input.name,
            email: input.email,
            createdAt: new Date()
        }
        store.set(newUser.id, newUser)
        return newUser;
    }

    const remove = async (id: string): Promise<boolean> => {
        return store.delete(id);
    }

    return {
        findById,
        findAll,
        create,
        remove
    }
}

export type UserRepo = ReturnType<typeof createUserRepo>;
