'use server';

import { signIn } from '@/auth';
import { LoginUserInput } from '@/features/auth-user/application/auth-user.types';
import { errorResponse, successResponse } from '@/lib/either';
import { AuthError } from 'next-auth';

const DEFAULT_LOGGING_ERROR = 'Error logging user';

export const logInUser = async (values: LoginUserInput) => {
	try {
		await signIn('credentials', values);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return errorResponse('User credentials not valid');
				case 'CallbackRouteError':
					return errorResponse('User not found');
				default:
					return errorResponse(error instanceof Error ? error.message : DEFAULT_LOGGING_ERROR);
			}
		}

		if (error instanceof Error && error.message === 'NEXT_REDIRECT') return successResponse('');

		return errorResponse(error instanceof Error ? error.message : DEFAULT_LOGGING_ERROR);
	}
};
