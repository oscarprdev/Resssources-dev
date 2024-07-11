import { Resources as Resource } from '@prisma/client';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';

export interface IHeroResourcesInfra {
	list(): Promise<Resource[]>;
}

export class HeroResourcesInfra implements IHeroResourcesInfra {
	constructor(private readonly client: ResourcesClient) {}

	async list() {
		return await this.client.getResourcesList({});
	}
}
