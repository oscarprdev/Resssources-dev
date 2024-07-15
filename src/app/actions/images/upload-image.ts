'use server';

import { auth } from '@/auth';
import { provideDashboardEditResourceUsecase } from '@/features/dashboard';
import { errorResponse } from '@/lib/either';

interface UploadImageActionInput {
	formData: FormData;
}

export const uploadImageAction = async ({ formData }: UploadImageActionInput) => {
	const session = await auth();
	if (!session?.user || !session.user.name) return errorResponse('User not authorized');

	const usecase = provideDashboardEditResourceUsecase();

	formData.append('username', session.user.name);

	return await usecase.updateImage({ formData });
};
