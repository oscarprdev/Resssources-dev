import { Resources as Resource } from '@prisma/client';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';

export interface IListHeroResourcesInfra {
	list(): Promise<Resource[]>;
}

export class ListHeroResourcesInfra implements IListHeroResourcesInfra {
	constructor(private readonly client: ResourcesClient) {}

	async list() {
		return await this.client.getResourcesList({ published: true, withUserData: false });
	}
}
