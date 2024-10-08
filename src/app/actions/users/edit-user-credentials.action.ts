'use server';

import { validateUserAuth } from '../shared/validate-user-auth';
import { provideEditUserUsecase } from '@/features/user/edit';
import { errorResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

export type EditUserCredencialsActionInput = {
	userId?: string;
	password: string;
	oldPassword: string;
};

export const editUserCredentialsAction = async ({ userId, password, oldPassword }: EditUserCredencialsActionInput) => {
	if (!userId) return errorResponse('User Id is mandatory to update the user credentials');

	const isUserAuth = await validateUserAuth(userId);
	if (!isUserAuth) errorResponse('User not authorized');

	const usecase = provideEditUserUsecase();
	const usecaseResponse = await usecase.editCredentials({ userId, password, oldPassword });

	revalidatePath('/account');
	revalidatePath('/account/password');

	return usecaseResponse;
};
