'use server';

import { auth } from '@/auth';
import { provideDashboardRemoveResourceUsecase } from '@/features/dashboard';
import { errorResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

export interface RemoveResourceInfoActionInput {
	resourceId: string;
}

export const removeResourceAction = async (input: RemoveResourceInfoActionInput) => {
	const session = await auth();
	if (!session?.user || !session.user.name) return errorResponse('User not authorized');

	const usecase = provideDashboardRemoveResourceUsecase();

	const response = await usecase.removeResource({ ...input, username: session.user.name });

	revalidatePath('/');
	revalidatePath('/dashboard');

	return response;
};
