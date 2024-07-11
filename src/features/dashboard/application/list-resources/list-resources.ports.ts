import { Resources as Resource } from '@prisma/client';

export interface ListResourcesPorts {
	getResources(input: GetResourcesListPortsInput): Promise<Resource[]>;
}

export type GetResourcesListPortsInput = {
	lastResourceId: string;
	pageSize: number;
	withUserData: boolean;
};
