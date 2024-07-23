import { z } from 'zod';

export const getUserInfoInputDto = z.object({
	username: z.string(),
});

export type GetUserInfoInputDto = z.infer<typeof getUserInfoInputDto>;

export const getUserInfoOutputDto = z.object({
	userId: z.string().uuid({ message: 'User Id must follow UUID format' }),
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

export const getUserByIdInputDto = z.object({
	userId: z.string().uuid({ message: 'User Id must follow UUID format' }),
});

export type GetUserByIdInputDto = z.infer<typeof getUserByIdInputDto>;

export const getUserByIdOutputDto = z.object({
	userId: z.string().uuid({ message: 'User Id must follow UUID format' }),
	username: z.string(),
	email: z.string().email(),
	profileImage: z.string(),
	description: z.string(),
	socialMedia: z
		.object({
			github: z.string().optional(),
			linkedin: z.string().optional(),
			twitter: z.string().optional(),
		})
		.optional(),
});

export type GetUserByIdOutputDto = z.infer<typeof getUserByIdOutputDto>;
