import { Resources } from '@prisma/client';
import { GetResourcesListPortsInput, ListResourcesPorts } from '../application/list-resources/list-resources.ports';
import { IListResourcesClient } from '../infrastructure/list-resources/list-resources.client';

export class ListResourcesAdapters implements ListResourcesPorts {
	constructor(private readonly resourcesClient: IListResourcesClient) {}

	async getResources({ lastResourceId, pageSize, withUserData }: GetResourcesListPortsInput): Promise<Resources[]> {
		return await this.resourcesClient.listResources({ cursor: lastResourceId, pageSize, withUserData });
	}
}
