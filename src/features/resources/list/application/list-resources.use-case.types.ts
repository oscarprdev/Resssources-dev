export type ResourceImage = {
	id: string;
	imgUrl: string;
};

export type ListResourcesInput = {
	published?: boolean;
	itemsPerRequest?: number;
	cursor?: string;
	withUserData: boolean;
};
