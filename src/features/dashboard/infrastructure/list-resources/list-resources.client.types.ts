export type GetResourcesListInput = {
	cursor: string;
	pageSize: number;
	withUserData: boolean;
};

export type GetUserByIdInput = {
	userId: string;
};
