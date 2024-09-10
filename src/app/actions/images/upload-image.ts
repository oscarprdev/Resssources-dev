'use server';

import { auth } from '@/auth';
import { provideEditResourceUsecase } from '@/features/resources/edit';
import { errorResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

interface UploadImageActionInput {
	formData: FormData;
}

export const uploadImageAction = async ({ formData }: UploadImageActionInput) => {
	const session = await auth();
	if (!session?.user || !session.user.name) return errorResponse('User not authorized');

	const usecase = provideEditResourceUsecase();

	formData.append('username', session.user.name);

	revalidatePath('/dashboard');

	return await usecase.updateImage({ formData });
};
