import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { ListArrivalsResourcesAdapter } from './adapters/list-arrivals-resources.adapter';
import { ListHeroResourcesAdapter } from './adapters/list-hero-resources.adapter';
import { ListHeroResourcesUsecase } from './application/list-hero-resources/list-hero-resources.use-case';
import { ListArrivalsResourcesInfra } from './infrastructure/list-arrivals-resources/list-arrivals-resources.infra';
import { ListHeroResourcesInfra } from './infrastructure/list-hero-resources/list-hero-resources.infra';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { ListArrivalsResourcesUsecase } from './application/list-arrivals-resources/list-arrivals-resources.use-case';

export const provideListHeroResourceUsecase = () => {
	const prismaResourcesClient = new PrismaResourcesClient();

	const heroResourceInfra = new ListHeroResourcesInfra(prismaResourcesClient);
	const heroResourceAdapter = new ListHeroResourcesAdapter(heroResourceInfra);

	return new ListHeroResourcesUsecase(heroResourceAdapter);
};

export const provideListArrivalsResourceUsecase = () => {
	const prismaResourcesClient = new PrismaResourcesClient();
	const prismaUsersClient = new PrismaUserClient();

	const arrivalsResourceInfra = new ListArrivalsResourcesInfra(prismaResourcesClient, prismaUsersClient);
	const arrivalsResourceAdapter = new ListArrivalsResourcesAdapter(arrivalsResourceInfra);

	return new ListArrivalsResourcesUsecase(arrivalsResourceAdapter);
};
