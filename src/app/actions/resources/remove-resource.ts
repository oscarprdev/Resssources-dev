'use server';

import { auth } from '@/auth';
import { provideRemoveResourceUsecase } from '@/features/resources/remove';
import { errorResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

export interface RemoveResourceInfoActionInput {
	resourceId: string;
}

export const removeResourceAction = async (input: RemoveResourceInfoActionInput) => {
	const session = await auth();
	if (!session?.user || !session.user.name) return errorResponse('User not authorized');

	const usecase = provideRemoveResourceUsecase();

	const response = await usecase.removeResource({ ...input, username: session.user.name });

	revalidatePath('/');
	revalidatePath('/dashboard');

	return response;
};
