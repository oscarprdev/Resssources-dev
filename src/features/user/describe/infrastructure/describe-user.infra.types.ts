import { UserStored } from '@/features/shared/types/global.types';

export type GetUserInfoInfraInput = {
	userId: string;
};

export type GetUserInfoInfraOutput = UserStored | null;

export type GetUserCountsInfraInput = {
	userId: string;
};

export type GetUserCountsInfraOutput = {
	createdCount: number;
	favCount: number;
};
