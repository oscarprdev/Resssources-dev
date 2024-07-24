'use server';

import { auth } from '@/auth';
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

	const session = await auth();
	if (!session?.user || !session.user.name || session.user.id !== userId) return errorResponse('User not authorized');

	const usecase = provideEditUserUsecase();

	revalidatePath('/account');
	revalidatePath('/account/password');

	return await usecase.editCredentials({ userId, password, oldPassword });
};
