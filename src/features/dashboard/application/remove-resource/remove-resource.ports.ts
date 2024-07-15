import { Resources as Resource } from '@prisma/client';

export interface RemoveResourcePorts {
	getResourceById(input: GetResourceByIdInput): Promise<Resource | null>;
	removeResource(input: RemoveResourcePortsInput): Promise<void>;
}

export type RemoveResourcePortsInput = {
	resourceId: string;
};

export type GetResourceByIdInput = {
	resourceId: string;
};
