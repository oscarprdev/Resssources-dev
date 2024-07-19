import { Kinds } from '../../shared/resources.types';

export type ListResourcesInfraInput = {
	published?: boolean;
	itemsPerRequest?: number;
	cursor?: string;
	kinds: Kinds;
	withUserData: boolean;
};

export type GetUserByIdInfraInput = {
	userId: string;
};

export type GetResourcesCountInfraInput = {
	published?: boolean;
	pagination: {
		cursor?: string;
	};
	filters: {
		kinds: Kinds;
	};
};
