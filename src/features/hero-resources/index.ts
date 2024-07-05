import { HeroResourcesAdapter } from './adapters/hero-resources.adapter';
import { HeroResourcesUsecase } from './application/hero-resources.use-case';
import { HeroResourcesInfra } from './infrastructure/hero-resources.infra';

export const provideHeroResourceUsecase = () => {
	const heroResourceInfra = new HeroResourcesInfra();
	const heroResourceAdapter = new HeroResourcesAdapter(heroResourceInfra);

	return new HeroResourcesUsecase(heroResourceAdapter);
};
