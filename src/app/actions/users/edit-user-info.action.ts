'use server';

import { auth } from '@/auth';
import { provideEditUserUsecase } from '@/features/user/edit';
import { errorResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

export type EditUserInfoActionInput = {
	userId?: string;
	email: string;
};

export const editUserInfoAction = async ({ userId, email }: EditUserInfoActionInput) => {
	if (!userId) return errorResponse('User Id is mandatory to update the user info');

	const session = await auth();
	if (!session?.user || !session.user.name || session.user.id !== userId) {
		return errorResponse('User not authorized');
	}

	const usecase = provideEditUserUsecase();
	const usecaseResponse = await usecase.editInfo({ userId, email });

	revalidatePath('/account');

	return usecaseResponse;
};
