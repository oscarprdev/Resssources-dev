import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { RemoveResourceClientInput } from './remove-resources.client.types';
import { REMOVE_RESOURCE_ERRORS } from './remove-resource.client-constants';

export interface IRemoveResourceClient {
	removeResource(input: RemoveResourceClientInput): Promise<void>;
}

export class RemoveResourceClient implements IRemoveResourceClient {
	constructor(private readonly resourceClient: ResourcesClient) {}

	async removeResource({ resourceId }: RemoveResourceClientInput): Promise<void> {
		try {
			await this.resourceClient.removeResource({ resourceId });
		} catch (error) {
			throw new Error(REMOVE_RESOURCE_ERRORS.REMOVING_RESOURCES);
		}
	}
}
