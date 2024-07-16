import { ResourceApplication, UserStored } from '@/features/shared/types/global.types';

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
