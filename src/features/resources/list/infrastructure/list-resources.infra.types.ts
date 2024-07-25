import { Kinds } from '../../shared/resources.types';

export type ListResourcesInfraInput = {
	published?: boolean;
	itemsPerRequest?: number;
	cursor?: string;
	userId?: string;
	kinds: Kinds;
	withUserData: boolean;
};

export type GetUserByIdInfraInput = {
	userId: string;
};

export type GetResourcesCountInfraInput = {
	published?: boolean;
	userId?: string;
	pagination: {
		cursor?: string;
	};
	filters: {
		kinds: Kinds;
	};
};

export type ListResourcesBySearchInfraInput = {
	cursor?: string;
	itemsPerRequest: number;
	kinds: Kinds;
	value: string;
};
