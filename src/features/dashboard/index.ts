import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { ListResourcesClient } from './infrastructure/list-resources/list-resources.client';
import { ListResourcesAdapters } from './adapters/list-resources.adapters';
import { ListResourcesUsecase } from './application/list-resources/list-resources.use-case';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';

export const provideDashboardListResourcesUsecase = () => {
	const resourcesClient = new PrismaResourcesClient();
	const userClient = new PrismaUserClient();
	const listResourcesClient = new ListResourcesClient(resourcesClient, userClient);
	const listResourcesAdapters = new ListResourcesAdapters(listResourcesClient);

	return new ListResourcesUsecase(listResourcesAdapters);
};
