import { Kinds, ResourceApplication, ResourceWithUserInfo } from '../../shared/resources.types';
import { ResourceSearched, ResourceType } from '@/features/shared/types/global.types';

export type ResourceImage = {
	id: string;
	imgUrl: string;
	title: string;
};

export type ListResourcesImagesInput = {
	kinds: Kinds;
};

export type ListResourcesInput = {
	published?: boolean;
	itemsPerRequest?: number;
	cursor?: string;
	userId?: string;
	kinds: Kinds;
	withUserData: boolean;
};

export type ListFavResourcesInput = {
	published?: boolean;
	itemsPerRequest?: number;
	cursor?: string;
	userId: string;
	kinds: Kinds;
	withUserData: boolean;
};

export type ListResourcesOutput = {
	items: ResourceWithUserInfo[] | ResourceApplication[];
	moreItems: boolean;
	cursor?: string;
	totalItems?: number;
};

export type ListProfileResourcesInput = {
	published?: boolean;
	itemsPerRequest?: number;
	cursor?: string;
	userId: string;
	kinds: Kinds;
	withUserData: boolean;
	resourceType: ResourceType;
};

export type GetResourcesCountInput = {
	published?: boolean;
	cursor?: string;
	userId?: string;
	kinds: Kinds;
};

export type ListResourcesBySearchInput = {
	cursor?: string;
	kinds: Kinds;
	value: string;
	itemsPerRequest: number;
};

export type ListResourcesBySearchOutput = {
	items: ResourceSearched[];
	moreItems: boolean;
	cursor?: string;
};
