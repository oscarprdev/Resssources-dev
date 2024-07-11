import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { ListResourcesClient } from './infrastructure/list-resources/list-resources.client';
import { ListResourcesAdapters } from './adapters/list-resources.adapters';
import { ListResourcesUsecase } from './application/list-resources/list-resources.use-case';

export const provideDashboardListResourcesUsecase = () => {
	const resourcesClient = new PrismaResourcesClient();
	const listResourcesClient = new ListResourcesClient(resourcesClient);
	const listResourcesAdapters = new ListResourcesAdapters(listResourcesClient);

	return new ListResourcesUsecase(listResourcesAdapters);
};
