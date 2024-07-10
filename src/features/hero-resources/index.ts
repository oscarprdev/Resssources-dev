import { HeroResourcesAdapter } from './adapters/hero-resources.adapter';
import { HeroResourcesUsecase } from './application/hero-resources.use-case';
import { HeroResourcesInfra } from './infrastructure/hero-resources.infra';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';

export const provideHeroResourceUsecase = () => {
	const prismaResourcesClient = new PrismaResourcesClient();

	const heroResourceInfra = new HeroResourcesInfra(prismaResourcesClient);
	const heroResourceAdapter = new HeroResourcesAdapter(heroResourceInfra);

	return new HeroResourcesUsecase(heroResourceAdapter);
};
