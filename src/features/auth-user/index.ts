import { PrismaUserClient } from '@/services/prisma/users/prisma-user.client';
import { AuthUserInfra } from './infrastructure/auth-user.infra';
import { AuthUserAdapter } from './adapters/auth-user.adapter';
import { AuthUserUsecase } from './application/auth-user.use-case';

export const provideAuthUserUseCase = () => {
	const prismaUserClient = new PrismaUserClient();

	const authUserInfra = new AuthUserInfra(prismaUserClient);
	const authUserAdapter = new AuthUserAdapter(authUserInfra);

	return new AuthUserUsecase(authUserAdapter);
};
