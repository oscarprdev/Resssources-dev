import { $Enums } from '@prisma/client';

export type GetResourcesListByOwnerInput = {
	userId: string;
};

export type GetResourcesListByFavInput = {
	userId: string;
};

export type GetResourcesListByKindInput = {
	kind: $Enums.Kind[];
};
