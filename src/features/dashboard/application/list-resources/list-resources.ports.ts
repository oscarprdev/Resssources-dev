import { $Enums, Users as UserStored } from '@prisma/client';
import { ResourceApplication } from './list-resources.use-case.types';

export interface ListResourcesPorts {
	getResources(input: GetResourcesListPortsInput): Promise<ResourceApplication[]>;
	getUserById(input: GetUserByIdInput): Promise<UserStored | null>;
}

export type GetResourcesListPortsInput = {
	lastResourceId: string;
	pageSize: number;
	withUserData: boolean;
};

export type GetUserByIdInput = {
	userId: string;
};
