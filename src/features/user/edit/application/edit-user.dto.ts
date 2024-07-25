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
	image: z
		.any()
		.optional()
		.refine(
			img => {
				
				return img === 'undefined' || (img && 'type' in img && 'name' in img && 'size' in img);
			},
			{
				message: 'Image must have type, name, and size if provided',
			}
		),
});

export type EditUserProfileInput = z.infer<typeof editUserProfileInput>;

export const editUserSocialInput = z.object({
	userId: z.string(),
	twitter: z
		.string()
		.optional()
		.refine(val => !val || z.string().url().safeParse(val).success, {
			message: 'Twitter value has invalid URL',
		}),
	linkedin: z
		.string()
		.optional()
		.refine(val => !val || z.string().url().safeParse(val).success, {
			message: 'Linkedin value has invalid URL',
		}),
	github: z
		.string()
		.optional()
		.refine(val => !val || z.string().url().safeParse(val).success, {
			message: 'Github value has invalid URL',
		}),
});

export type EditUserSocialInput = z.infer<typeof editUserSocialInput>;
