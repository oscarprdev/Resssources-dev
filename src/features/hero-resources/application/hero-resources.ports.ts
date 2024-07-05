import { GetHeroResourcesOutput } from './hero-resources.types';

export interface HeroResourcesPorts {
	getResourcesData(): Promise<GetHeroResourcesOutput[]>;
}
