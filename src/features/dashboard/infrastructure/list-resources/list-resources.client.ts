import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { Resources as Resource } from '@prisma/client';
import { LIST_RESOURCES_ERRORS } from './list-resources.client.constants';
import { GetResourcesListInput } from './list-resources.client.types';

export interface IListResourcesClient {
	listResources(input: GetResourcesListInput): Promise<Resource[]>;
}

export class ListResourcesClient implements IListResourcesClient {
	constructor(private readonly resourcesClient: ResourcesClient) {}

	async listResources({ cursor, pageSize, withUserData }: GetResourcesListInput): Promise<Resource[]> {
		try {
			return await this.resourcesClient.getResourcesList({ cursor, pageSize, withUserData });
		} catch (error) {
			throw new Error(LIST_RESOURCES_ERRORS.LISTING_RESOURCES);
		}
	}
}
