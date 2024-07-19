import { ListResourcesAdapters } from './adapters/list-resource.adapters';
import { ListResourcesUsecase } from './application/list-resources.use-case';
import { ListResourcesInfra } from './infrastructure/list-resources.infra';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';

export const provideListResourceUsecase = () => {
	const resourceClient = new PrismaResourcesClient();
	const userClient = new PrismaUserClient();

	const listResourcesInfra = new ListResourcesInfra(resourceClient, userClient);
	const listResourcesAdapters = new ListResourcesAdapters(listResourcesInfra);

	return new ListResourcesUsecase(listResourcesAdapters);
};
