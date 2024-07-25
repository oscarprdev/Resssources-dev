import { z } from 'zod';

export const removeUserInputDto = z.object({
	userId: z.string().uuid(),
});

export type RemoveUserInputDto = z.infer<typeof removeUserInputDto>;
