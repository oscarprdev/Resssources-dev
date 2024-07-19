import { provideAuthUserUseCase } from './features/core/auth-user';
import { isError } from './lib/either';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
