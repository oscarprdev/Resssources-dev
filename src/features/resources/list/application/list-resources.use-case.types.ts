import { Kinds, ResourceApplication, ResourceWithUserInfo } from '../../shared/resources.types';

export type ResourceImage = {
	id: string;
	imgUrl: string;
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

export type ListResourcesOutput = {
	items: ResourceWithUserInfo[] | ResourceApplication[];
	moreItems: boolean;
	cursor?: string;
	totalItems?: number;
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
};

export type ResourceSearched = {
	id: string;
	faviconUrl: string;
	title: string;
	description: string;
	url: string;
};

export type ListResourcesBySearchOutput = ResourceSearched[];
