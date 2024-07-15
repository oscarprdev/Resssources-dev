import { z } from 'zod';

export const editResourceInputSchema = z.object({
	username: z.string(),
	title: z.string(),
	description: z.string(),
	faviconUrl: z.string().url(),
	imgUrl: z.string().url(),
	resourceUrl: z.string().url(),
});

