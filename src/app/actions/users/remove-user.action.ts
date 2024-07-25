'use server';

import { validateUserAuth } from '../shared/validate-user-auth';
import { provideRemoveUserUsecase } from '@/features/user/remove';
import { errorResponse } from '@/lib/either';

interface RemoveUserActionInput {
	userId: string;
}

export const removeUserAction = async ({ userId }: RemoveUserActionInput) => {
	if (!userId) return errorResponse('User Id is mandatory to update the user credentials');

	const isUserAuth = await validateUserAuth(userId);
	if (!isUserAuth) errorResponse('User not authorized');

	const usecase = provideRemoveUserUsecase();

	return await usecase.removeUser({ userId });
};
