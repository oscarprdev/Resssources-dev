export type ListResourcesInfraInput = {
	published?: boolean;
	itemsPerRequest?: number;
	cursor?: string;
	withUserData: boolean;
};

export type GetUserByIdInfraInput = {
	userId: string;
};
