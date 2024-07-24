'use server';

import { validateUserAuth } from '../shared/validate-user-auth';
import { provideEditUserUsecase } from '@/features/user/edit';
import { errorResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

export type EditUserProfileActionInput = {
	userId?: string;
	username?: string;
	formData: FormData;
};

export const editUserProfileAction = async ({ userId, username, formData }: EditUserProfileActionInput) => {
	if (!userId) return errorResponse('User Id is mandatory to update the user profile');
	if (!username) return errorResponse('Username is mandatory to update user profile');

	const isUserAuth = await validateUserAuth(userId);
	if (!isUserAuth) errorResponse('User not authorized');

	const image = formData.get('image') as File | null;
	const description = formData.get('description') as string | null;
	if (!username || !image || !description)
		return errorResponse('Username, image and description are mandatory to update user profile');

	const usecase = provideEditUserUsecase();
	const usecaseResponse = await usecase.editProfile({ userId, username, image, description });

	revalidatePath('/account');
	revalidatePath('/account/profile');

	return usecaseResponse;
};
