'use server';

import { provideAuthUserUseCase } from '@/features/auth-user';
import { RegisterUserInput } from '@/features/auth-user/application/auth-user.types';

export const registerUser = async (values: RegisterUserInput) => {
	const authUsecase = provideAuthUserUseCase();

	return await authUsecase.register(values);
};
