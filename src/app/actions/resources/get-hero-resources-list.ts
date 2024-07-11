'use server';

import { HeroResourcesUsecase } from '@/features/hero-resources/application/hero-resources.use-case';

export const getHeroResourcesList = async (useCase: HeroResourcesUsecase) => {
	return await useCase.getHeroResources();
};
