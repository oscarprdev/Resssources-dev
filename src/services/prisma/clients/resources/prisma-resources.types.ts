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
	title: string;
	description: string;
	faviconUrl: string;
	imgUrl: string;
	resourceUrl: string;
	kind: $Enums.Kind[];
	ownerId: string;
};
