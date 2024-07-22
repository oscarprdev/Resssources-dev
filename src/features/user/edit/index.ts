import { EditUserAdapters } from './adapters/edit-user.adapters';
import { DefaultEditUserUsecase } from './application/edit-user.use-case';
import { DefaultEditUserInfra } from './infrastructure/edit-user.infra';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';

export const provideEditUserUsecase = () => {
	const userClient = new PrismaUserClient();

	const editUserInfra = new DefaultEditUserInfra(userClient);
	const editUserAdapters = new EditUserAdapters(editUserInfra);

	return new DefaultEditUserUsecase(editUserAdapters);
};
