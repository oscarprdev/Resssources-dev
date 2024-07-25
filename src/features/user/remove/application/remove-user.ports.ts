import { ResourceStored } from '@/features/shared/types/global.types';

export interface RemoveUserPorts {
	removeUser(input: RemoveUserPortsInput): Promise<void>;

	getUserAdminId(): Promise<string | undefined>;

	getUserResourcesById(input: GetUserResourcesByIdPortsInput): Promise<ResourceStored[]>;
	editResourceOwner(input: EditResourceOwnerPortsInput): Promise<void>;
}

export type RemoveUserPortsInput = {
	userId: string;
};

export type GetUserResourcesByIdPortsInput = {
	userId: string;
};

export type EditResourceOwnerPortsInput = {
	resourceId: string;
	oldOwnerId: string;
	newOwnerId: string;
};
