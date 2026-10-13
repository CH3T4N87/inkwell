// Promise, not proof: TS can't check a generic T, so this holds only if T's id is exactly string and createdAt exactly Date.

interface Entity {
    id: string;
    createdAt: Date
}

export const createInMemoryRepository = <T extends Entity>(store: Map<string, T>) => {

    const findAll = async (): Promise<T[]> => {
        return [...store.values()];
    }

    const findById = async (id: string): Promise<T | undefined> => {
        return store.get(id);
    }

    const create = async (input: Omit<T, keyof Entity>): Promise<T> => {
        const newEntry = { ...input, id: crypto.randomUUID(), createdAt: new Date() } as T;
        store.set(newEntry.id, newEntry);
        return newEntry;
    }

    const remove = async (id: string): Promise<boolean> => {
        return store.delete(id);
    }

    return {
        findAll,
        findById,
        create,
        remove
    }
}

export type inMemoryRepository = ReturnType<typeof createInMemoryRepository>;