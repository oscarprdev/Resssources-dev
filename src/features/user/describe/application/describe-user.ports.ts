import { SocialMedia, UserStored } from '@/features/shared/types/global.types';

export interface DescribeUserPorts {
	getUserInfo(input: GetUserInfoPortInput): Promise<GetUserInfoPortOutput>;
	getUserInfoCounts(input: GetUserInfoCountsPortInput): Promise<GetUserInfoCountsPortOutput>;

	getUserById(input: GetUserByIdPortInput): Promise<GetUserByIdPortOutput>;

	getUserSocialMedia(input: GetUserSocialMediaPortInput): Promise<SocialMedia | null>;
}

export type GetUserInfoPortInput = {
	username: string;
};

export type GetUserInfoPortOutput = UserStored | null;

export type GetUserByIdPortInput = {
	userId: string;
};

export type GetUserByIdPortOutput = UserStored | null;

export type GetUserInfoCountsPortInput = {
	userId: string;
};

export type GetUserInfoCountsPortOutput = {
	favCount: number;
	createdCount: number;
};

export type GetUserSocialMediaPortInput = {
	userId: string;
};
