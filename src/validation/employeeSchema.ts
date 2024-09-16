import { z } from "zod";

export const rolesSchema = z.enum(['seamstress', 'cutter', 'technologist',]);

export const employeeSchema = z.object({
    avatar: z.string().nullable(),
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    phone: z.string().min(12, 'Номер телефона должен быть корректным'),
    role: rolesSchema,
    teamId: z.string().optional(),
    active: z.boolean().default(true),
});