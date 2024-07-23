import { SocialMedia, UserStored } from '@/features/shared/types/global.types';

export type GetUserInfoInfraInput = {
	username: string;
};

export type GetUserInfoInfraOutput = UserStored | null;

export type GetUserCountsInfraInput = {
	userId: string;
};

export type GetUserCountsInfraOutput = {
	createdCount: number;
	favCount: number;
};

export type GetUserSocialMediaInfraInput = {
	userId: string;
};

export type GetUserSocialMediaInfraOutput = SocialMedia;

export type GetUserByIdInfraInput = {
	userId: string;
};

export type GetUserByIdInfraOutput = UserStored | null;
