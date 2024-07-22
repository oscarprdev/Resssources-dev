import { z } from 'zod';

export const getUserInfoInputDto = z.object({
	userId: z.string().uuid(),
});

export type GetUserInfoInputDto = z.infer<typeof getUserInfoInputDto>;

export const getUserInfoOutputDto = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
	favCount: z.number(),
	createdCount: z.number(),
});

export type GetUserInfoOutputDto = z.infer<typeof getUserInfoOutputDto>;
