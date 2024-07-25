import {
	EditResourceOwnerPortsInput,
	GetUserResourcesByIdPortsInput,
	RemoveUserPorts,
	RemoveUserPortsInput,
} from '../application/remove-user.ports';
import { RemoveUserInfra } from '../infrastructure/remove-user.infra';

export class RemoveUserAdapters implements RemoveUserPorts {
	constructor(private readonly infra: RemoveUserInfra) {}

	async removeUser({ userId }: RemoveUserPortsInput) {
		await this.infra.removeUser({ userId });
	}

	async getUserAdminId() {
		const user = await this.infra.getUserAdminId();

		return user?.id;
	}

	async getUserResourcesById({ userId }: GetUserResourcesByIdPortsInput) {
		return await this.infra.getResources({ userId });
	}

	async editResourceOwner({ resourceId, newOwnerId, oldOwnerId }: EditResourceOwnerPortsInput) {
		await this.infra.editResourceOwner({ resourceId, newOwnerId, oldOwnerId });
	}
}
