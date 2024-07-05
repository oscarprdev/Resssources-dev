import { getHeroResourcesList } from '@/services/prisma/resources';
import { ListOutput } from './hero-resources.infra.types';

export interface IHeroResourcesInfra {
	list(): Promise<ListOutput[]>;
}

export class HeroResourcesInfra implements IHeroResourcesInfra {
	constructor() {}

	async list(): Promise<ListOutput[]> {
		return await getHeroResourcesList();
	}
}
