import { RemoveResourcePorts, RemoveResourcePortsInput } from '../application/remove-resource.ports';
import { RemoveResourceClient } from '../infrastructure/remove-resources.client';
import { ResourceStored } from '@/features/shared/types/global.types';

export class RemoveResourceAdapters implements RemoveResourcePorts {
	constructor(private readonly client: RemoveResourceClient) {}

	async getResourceById({ resourceId }: RemoveResourcePortsInput): Promise<ResourceStored | null> {
		return await this.client.getResourceById({ resourceId });
	}

	async removeResource({ resourceId }: RemoveResourcePortsInput): Promise<void> {
		await this.client.removeResource({ resourceId });
	}
}
