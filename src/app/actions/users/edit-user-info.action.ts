'use server';

import { auth } from '@/auth';
import { provideEditUserUsecase } from '@/features/user/edit';
import { errorResponse } from '@/lib/either';

export type EditUserInfoActionInput = {
	userId: string;
	email: string;
};

export const editUserInfoAction = async ({ userId, email }: EditUserInfoActionInput) => {
	const session = await auth();
	if (!session?.user || !session.user.name || session.user.id !== userId) return errorResponse('User not authorized');

	const usecase = provideEditUserUsecase();

	return await usecase.editInfo({ userId, email });
};
