import { $Enums } from '@prisma/client';

export type GetResourceByIdInput = {
	resourceId: string;
};

export type GetResourcesListByOwnerInput = {
	userId: string;
};

export type GetResourcesListByFavInput = {
	userId: string;
};

export type GetResourcesListByKindInput = {
	kind: $Enums.Kind[];
};

export type CreateResourceInput = {
	resourceId: string;
	title: string;
	description: string;
	faviconUrl: string;
	imgUrl: string;
	resourceUrl: string;
	kinds: $Enums.Kind[];
	ownerId: string;
};
