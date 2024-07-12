import { ResourceWithRelations } from '@/services/prisma/clients/resources/prisma-resources.types';
import { $Enums } from '@prisma/client';

export type GetResourcesListInput = {
	lastResourceId: string;
	pageSize: number;
};

export type ResourceApplication = {
	id: string;
	title: string;
	description: string;
	imgUrl: string;
	faviconUrl: string;
	resourceUrl: string;
	createdAt: string;
	updatedAt: string;
	published: boolean;
	kind: $Enums.Kind[];
	favouritedBy: Object[];
	resourceCreatedBy: {
		userId: string;
		resourceId: string;
		createdAt: Date;
	}[];
};

export interface ResourceWithUserInfo extends ResourceApplication {
	resourceCreatedBy: {
		userId: string;
		resourceId: string;
		createdAt: Date;
		username: string | null;
	}[];
}
