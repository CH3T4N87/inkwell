export type AppError = {
    status: number,
    message: string
}

export const createAppError = (status: number, message: string): AppError => {
    return {
        status,
        message
    }
}

export const isAppError = (err: unknown): err is AppError => {
    if (typeof err !== "object" || err === null) {
        return false;
    }

    return (
        "status" in err &&
        "message" in err &&
        typeof err.status === "number" &&
        typeof err.message === "string"
    );
};