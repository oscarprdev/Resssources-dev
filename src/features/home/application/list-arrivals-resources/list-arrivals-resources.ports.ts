import { ResourceApplication, UserStored } from '@/features/shared/types/global.types';

export interface ListArrivalsResourcesPorts {
	listArrivalsResources(input: ListArrivalsResourcesInput): Promise<ResourceApplication[]>;
	getUserById(input: GetUserByIdInput): Promise<UserStored | null>;
}

export type GetUserByIdInput = {
	userId: string;
};

export type ListArrivalsResourcesInput = {
	published: true;
	limit: number;
};
