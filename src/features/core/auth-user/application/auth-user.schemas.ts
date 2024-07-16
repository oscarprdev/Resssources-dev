import { z } from 'zod';

export const loginInputSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export const registerUserSchema = z.object({
	username: z.string(),
	password: z.string(),
	email: z.string().email(),
});
