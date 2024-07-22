'use server';

import { auth } from '@/auth';
import { provideEditUserUsecase } from '@/features/user/edit';
import { errorResponse } from '@/lib/either';

export type EditUserCredencialsActionInput = {
	userId: string;
	password: string;
};

export const editUserCredentialsAction = async ({ userId, password }: EditUserCredencialsActionInput) => {
	const session = await auth();
	if (!session?.user || !session.user.name || session.user.id !== userId) return errorResponse('User not authorized');

	const usecase = provideEditUserUsecase();

	return await usecase.editCredentials({ userId, password });
};
