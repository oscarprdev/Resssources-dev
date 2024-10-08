import { REMOVE_RESOURCE_ERRORS } from './remove-resource.client-constants';
import { GetResourceByIdClientInput, RemoveResourceClientInput } from './remove-resources.client.types';
import { ResourceStored } from '@/features/shared/types/global.types';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';

export interface IRemoveResourceClient {
	getResourceById(input: GetResourceByIdClientInput): Promise<ResourceStored | null>;
	removeResource(input: RemoveResourceClientInput): Promise<void>;
}

export class RemoveResourceClient implements IRemoveResourceClient {
	constructor(private readonly resourceClient: ResourcesClient) {}

	async getResourceById({ resourceId }: GetResourceByIdClientInput): Promise<ResourceStored | null> {
		try {
			return this.resourceClient.getResourceById({ resourceId });
		} catch (error) {
			throw new Error(REMOVE_RESOURCE_ERRORS.RETRIEVING_RESOURCE);
		}
	}

	async removeResource({ resourceId }: RemoveResourceClientInput): Promise<void> {
		try {
			await this.resourceClient.removeResource({ resourceId });
		} catch (error) {
			throw new Error(REMOVE_RESOURCE_ERRORS.REMOVING_RESOURCES);
		}
	}
}
