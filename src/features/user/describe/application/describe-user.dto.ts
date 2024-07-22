import { z } from 'zod';

export const getUserInfoInputDto = z.object({
	username: z.string(),
});

export type GetUserInfoInputDto = z.infer<typeof getUserInfoInputDto>;

export const getUserInfoOutputDto = z.object({
	userId: z.string(),
	email: z.string().email(),
	profileImage: z.string(),
	description: z.string(),
	favCount: z.number(),
	createdCount: z.number(),
	socialMedia: z
		.object({
			github: z.string().optional(),
			linkedin: z.string().optional(),
			twitter: z.string().optional(),
		})
		.optional(),
});

export type GetUserInfoOutputDto = z.infer<typeof getUserInfoOutputDto>;
