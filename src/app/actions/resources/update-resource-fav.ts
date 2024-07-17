'use server';

import { auth } from '@/auth';
import { provideEditResourceUsecase } from '@/features/resources/edit';
import { errorResponse, successResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

export type UpdateResourceFavInput = {
	resourceId: string;
	favourited: boolean;
};

export const updateResourceFav = async ({ resourceId, favourited }: UpdateResourceFavInput) => {
	const session = await auth();
	if (!session?.user || !session.user.name) return errorResponse('User not authorized');

	const editResourceUsecase = provideEditResourceUsecase();

	const response = await editResourceUsecase.updateResourceFav({ resourceId, username: session.user.name, favourited });

	revalidatePath('/');

	return response;
};
