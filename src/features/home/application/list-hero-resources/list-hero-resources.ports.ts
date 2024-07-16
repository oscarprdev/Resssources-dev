import { ListHeroResourcesOutput } from './list-hero-resources.types';

export interface ListHeroResourcesPorts {
	listHeroResources(): Promise<ListHeroResourcesOutput[]>;
}
