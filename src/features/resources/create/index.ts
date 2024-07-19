import { CreateResourceAdapters } from './adapters/create-resource.adapters';
import { CreateResourceUsecase } from './application/create-resources.use-case';
import { CreateResourceInfra } from './infrastructure/create-resource.infra';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';

export const provideCreateResourceUsecase = () => {
	const userClient = new PrismaUserClient();
	const resourceClient = new PrismaResourcesClient();

	const createResourceInfra = new CreateResourceInfra(userClient, resourceClient);
	const createResourceAdapters = new CreateResourceAdapters(createResourceInfra);

	return new CreateResourceUsecase(createResourceAdapters);
};
