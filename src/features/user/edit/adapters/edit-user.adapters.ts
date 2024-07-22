import { EditUserCredentialsPortsInput, EditUserInfoPortsInput, EditUserPorts } from '../application/edit-user.ports';
import { EditUserInfra } from '../infrastructure/edit-user.infra';

export class EditUserAdapters implements EditUserPorts {
	constructor(private readonly infra: EditUserInfra) {}

	async editInfo({ userId, email }: EditUserInfoPortsInput) {
		await this.infra.editInfo({ userId, email });
	}

	async editCredentials({ userId, password }: EditUserCredentialsPortsInput) {
		await this.infra.editCredentials({ userId, password });
	}
}
