import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const createResourceInputSchema = z.object({
	username: z.string(),
	resourceUrl: z.string().url(),
	kinds: z.array(z.nativeEnum($Enums.Kind)),
});
