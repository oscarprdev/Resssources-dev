import { ResourceStored } from '@/features/shared/global.types';

export interface RemoveResourcePorts {
	getResourceById(input: GetResourceByIdInput): Promise<ResourceStored | null>;
	removeResource(input: RemoveResourcePortsInput): Promise<void>;
}

export type RemoveResourcePortsInput = {
	resourceId: string;
};

export type GetResourceByIdInput = {
	resourceId: string;
};
