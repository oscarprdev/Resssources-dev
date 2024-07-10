import { $Enums } from '@prisma/client';

export type CreateResourceInput = {
	username: string;
	resourceUrl: string;
	kinds: $Enums.Kind[];
};
