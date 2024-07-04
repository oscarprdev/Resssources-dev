import { $Enums } from '@prisma/client';

export type CreateResourceInput = {
	title: string;
	description: string;
	faviconUrl: string;
	imgUrl: string;
	resourceUrl: string;
	kind: $Enums.Kind;
	ownerId: string;
};
