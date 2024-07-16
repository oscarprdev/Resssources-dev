import { z } from 'zod';

export const editResourceInputSchema = z.object({
	resourceId: z.string(),
	username: z.string(),
	title: z.string(),
	description: z.string(),
	imgUrl: z.string().url(),
	resourceUrl: z.string().url(),
});

export const editResourcePublishedInputSchema = z.object({
	resourceId: z.string(),
	username: z.string(),
	published: z.boolean(),
});
