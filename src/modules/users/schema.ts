import z from "zod";

export const ZUser = z.object({
    id: z.uuid(),
    name: z.string().trim().nonempty(),
    email: z.email(),
    createdAt: z.date(),
})
export type User = z.infer<typeof ZUser>;

export const ZNewUser = ZUser.pick({
    name: true,
    email: true
});
export type NewUser = z.infer<typeof ZNewUser>;