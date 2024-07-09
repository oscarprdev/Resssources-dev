import { $Enums } from '@prisma/client';

export type CreateResourceInput = {
	username: string;
	resourceUrl: string;
	kind: $Enums.Kind;
};
