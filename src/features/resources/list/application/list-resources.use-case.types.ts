import { Kinds, ResourceWithUserInfo } from '../../shared/resources.types';

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
	kinds: Kinds;
	withUserData: boolean;
};

export type ListResourcesOutput = {
	items: ResourceWithUserInfo[];
	moreItems: boolean;
	cursor?: string;
	totalItems?: number;
};

export type GetResourcesCountInput = {
	published?: boolean;
	cursor?: string;
	kinds: Kinds;
};
