import { RemoveUserAdapters } from './adapters/remove-user.adapters';
import { DefaultRemoveUserUsecase } from './application/remove-user.usecase';
import { DefaultRemoveUserInfra } from './infrastructure/remove-user.infra';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';

export const provideRemoveUserUsecase = () => {
	const usersClient = new PrismaUserClient();
	const resourcesClient = new PrismaResourcesClient();
	const removeUserInfra = new DefaultRemoveUserInfra(usersClient, resourcesClient);
	const removeUserAdapters = new RemoveUserAdapters(removeUserInfra);

	return new DefaultRemoveUserUsecase(removeUserAdapters);
};
