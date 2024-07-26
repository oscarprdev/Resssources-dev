'use server';

import { provideDescribeUserUsecase } from '@/features/user/describe';

type GetUserInfoByUsernameAction = {
	username: string;
};

export const getUserInfoByUsernameAction = async ({ username }: GetUserInfoByUsernameAction) => {
	const usecase = provideDescribeUserUsecase();

	return await usecase.getUserInfo({ username });
};
