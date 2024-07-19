import { Kinds, ResourceWithUserInfo } from '../../shared/resources.types';

export type ResourceImage = {
	id: string;
	imgUrl: string;
};

export type ListResourcesInput = {
	published?: boolean;
	itemsPerRequest?: number;
	cursor?: string;
	kinds?: Kinds;
	withUserData: boolean;
};

export type ListResourcesOutput = {
	resources: ResourceWithUserInfo[];
	moreItems: boolean | null;
	cursor: string;
};
