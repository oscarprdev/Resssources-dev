import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { RemoveResourceUsecase } from './application/remove-resource.use-case';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { RemoveResourceClient } from './infrastructure/remove-resources.client';
import { RemoveResourceAdapters } from './adapters/remove-resource.adapters';

export const provideRemoveResourceUsecase = (): RemoveResourceUsecase => {
	const userClient = new PrismaUserClient();
	const resourcesClient = new PrismaResourcesClient();
	const removeResourceClient = new RemoveResourceClient(resourcesClient);
	const removeResourceAdapter = new RemoveResourceAdapters(removeResourceClient);

	return new RemoveResourceUsecase(removeResourceAdapter, userClient);
};
