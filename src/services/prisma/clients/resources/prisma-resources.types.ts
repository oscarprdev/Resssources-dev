import { $Enums, Prisma, Users as User } from '@prisma/client';

export type GetResourceByIdInput = {
	resourceId: string;
};

export type GetResourceByTitleInput = {
	title: string;
};

export type GetResourceByUrlInput = {
	resourceUrl: string;
};

export type GetResourcesListInput = {
	withUserData: boolean;
	published?: boolean;
	pagination?: {
		cursor: string;
		pageSize: number;
	};
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

export type ResourceWithRelations = Prisma.ResourcesGetPayload<{
	include: {
		favouritedBy: true;
		resourceCreatedBy: true;
	};
}>;

export type UpdateResourceInput = {
	resourceId: string;
	title: string;
	description: string;
	imgUrl: string;
	resourceUrl: string;
};

export type UpdateResourcePublishedInput = {
	resourceId: string;
	published: boolean;
};

export type RemoveResourceInput = {
	resourceId: string;
};
