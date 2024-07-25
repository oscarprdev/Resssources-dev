import { EditResourceOwnerInfraInput, GetResourcesInfraInput, RemoveUserInfraInput } from './remove-user.infra.types';
import { ResourceStored, UserStored } from '@/features/shared/types/global.types';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export interface RemoveUserInfra {
	removeUser(input: RemoveUserInfraInput): Promise<void>;

	getUserAdminId(): Promise<UserStored | null>;

	getResources(input: GetResourcesInfraInput): Promise<ResourceStored[]>;

	editResourceOwner(input: EditResourceOwnerInfraInput): Promise<void>;
}

export class DefaultRemoveUserInfra implements RemoveUserInfra {
	constructor(
		private readonly userClient: UserClient,
		private readonly resourcesClient: ResourcesClient
	) {}

	async removeUser({ userId }: RemoveUserInfraInput) {
		await this.userClient.removeUser({ userId });
	}

	async getUserAdminId() {
		return await this.userClient.getUserAdmin();
	}

	async getResources({ userId }: GetResourcesInfraInput) {
		return this.resourcesClient.getResourcesListByOwner({ userId });
	}

	async editResourceOwner({ resourceId, newOwnerId, oldOwnerId }: EditResourceOwnerInfraInput) {
		await this.resourcesClient.updateResourceOwner({ resourceId, newOwnerId, oldOwnerId });
	}
}
