import { ListHeroResourcesAdapter } from './adapters/list-hero-resources.adapter';
import { ListHeroResourcesUsecase } from './application/list-hero-resources/list-hero-resources.use-case';
import { ListHeroResourcesInfra } from './infrastructure/list-hero-resources/list-hero-resources.infra';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';

export const provideListHeroResourceUsecase = () => {
	const prismaResourcesClient = new PrismaResourcesClient();

	const heroResourceInfra = new ListHeroResourcesInfra(prismaResourcesClient);
	const heroResourceAdapter = new ListHeroResourcesAdapter(heroResourceInfra);

	return new ListHeroResourcesUsecase(heroResourceAdapter);
};
