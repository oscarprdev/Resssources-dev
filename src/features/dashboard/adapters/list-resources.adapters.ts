import { formatDistanceTime } from '@/lib/dates';
import { GetResourcesListPortsInput, GetUserByIdInput, ListResourcesPorts } from '../application/list-resources/list-resources.ports';
import { IListResourcesClient } from '../infrastructure/list-resources/list-resources.client';

export class ListResourcesAdapters implements ListResourcesPorts {
	constructor(private readonly listResourcesClient: IListResourcesClient) {}

	async getResources({ lastResourceId, pageSize, withUserData }: GetResourcesListPortsInput) {
		const resourcesInfra = await this.listResourcesClient.listResources({ cursor: lastResourceId, pageSize, withUserData });

		return resourcesInfra.map((resource) => ({
			...resource,
			createdAt: formatDistanceTime(resource.createdAt),
			updatedAt: formatDistanceTime(resource.updatedAt),
		}));
	}

	async getUserById({ userId }: GetUserByIdInput) {
		return await this.listResourcesClient.getUserById({ userId });
	}
}
