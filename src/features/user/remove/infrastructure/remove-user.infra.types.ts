export type RemoveUserInfraInput = {
	userId: string;
};

export type GetResourcesInfraInput = {
	userId: string;
};

export type EditResourceOwnerInfraInput = {
	resourceId: string;
	oldOwnerId: string;
	newOwnerId: string;
};
