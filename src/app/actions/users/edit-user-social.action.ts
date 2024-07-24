'use server';

import { validateUserAuth } from '../shared/validate-user-auth';
import { provideEditUserUsecase } from '@/features/user/edit';
import { errorResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

export type EditUserSocialActionInput = {
	userId?: string;
	twitter?: string;
	linkedin?: string;
	github?: string;
};

export const editUserSocialAction = async ({ userId, twitter, linkedin, github }: EditUserSocialActionInput) => {
	if (!userId) return errorResponse('User Id is mandatory to update the user info');

	const isUserAuth = await validateUserAuth(userId);
	if (!isUserAuth) errorResponse('User not authorized');

	const usecase = provideEditUserUsecase();
	const usecaseResponse = await usecase.editSocial({ userId, twitter, linkedin, github });

	revalidatePath('/account');
	revalidatePath('/account/social');

	return usecaseResponse;
};
