import { Pool } from "pg";

export const createPool = (connectionString: string): Pool => {
    return new Pool({ connectionString });
}