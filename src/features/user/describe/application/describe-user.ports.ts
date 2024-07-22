import { UserStored } from '@/features/shared/types/global.types';

export interface DescribeUserPorts {
	getUserInfo(input: GetUserInfoPortInput): Promise<GetUserInfoPortOutput>;
	getUserInfoCounts(input: GetUserInfoCountsInput): Promise<GetUserInfoCountsOutput>;
}

export type GetUserInfoPortInput = {
	userId: string;
};

export type GetUserInfoPortOutput = UserStored | null;

export type GetUserInfoCountsInput = {
	userId: string;
};

export type GetUserInfoCountsOutput = {
	favCount: number;
	createdCount: number;
};
