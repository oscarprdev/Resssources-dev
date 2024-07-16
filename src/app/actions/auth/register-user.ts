'use server';

import { provideAuthUserUseCase } from '@/features/core/auth-user';
import { RegisterUserInput } from '@/features/core/auth-user/application/auth-user.types';

export const registerUser = async (values: RegisterUserInput) => {
	const authUsecase = provideAuthUserUseCase();

	return await authUsecase.register(values);
};
