import { z } from 'zod';

export const removeResourceInputSchema = z.object({
	resourceId: z.string(),
	username: z.string(),
});
