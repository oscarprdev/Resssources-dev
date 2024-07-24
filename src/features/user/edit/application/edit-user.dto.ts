import { z } from 'zod';

export const editUserInfoInput = z.object({
	userId: z.string(),
	email: z.string().email(),
});

export type EditUserInfoInput = z.infer<typeof editUserInfoInput>;

export const editUserCredentialsInput = z.object({
	userId: z.string(),
	oldPassword: z.string(),
	password: z.string(),
});

export type EditUserCredentialsInput = z.infer<typeof editUserCredentialsInput>;

export const editUserProfileInput = z.object({
	userId: z.string(),
	username: z.string(),
	description: z.string(),
	image: z.instanceof(File),
});

export type EditUserProfileInput = z.infer<typeof editUserProfileInput>;
