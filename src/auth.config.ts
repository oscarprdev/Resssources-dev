import Credentials from 'next-auth/providers/credentials';
import { NextAuthConfig } from 'next-auth';
import { provideAuthUserUseCase } from './features/auth-user';
import { isError } from './lib/either';
import { $Enums } from '@prisma/client';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const authUserUsecase = provideAuthUserUseCase();
				const response = await authUserUsecase.login({
					username: credentials.username as string,
					password: credentials.password as string,
				});

				if (isError(response)) {
					throw new Error(response.error);
				}

				return {
					name: response.success.username,
					role: response.success.role,
				};
			},
		}),
	],
} satisfies NextAuthConfig;
