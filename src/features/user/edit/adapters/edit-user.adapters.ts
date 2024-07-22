import {
	EditUserCredentialsPortsInput,
	EditUserInfoPortsInput,
	EditUserPorts,
	GetCurrentPasswordByUserIdInput,
	GetCurrentPasswordByUserIdOutput,
} from '../application/edit-user.ports';
import { EditUserInfra } from '../infrastructure/edit-user.infra';

export class EditUserAdapters implements EditUserPorts {
	constructor(private readonly infra: EditUserInfra) {}

	async editInfo({ userId, email }: EditUserInfoPortsInput) {
		await this.infra.editInfo({ userId, email });
	}

	async editCredentials({ userId, password }: EditUserCredentialsPortsInput) {
		await this.infra.editCredentials({ userId, password });
	}

	async getCurrentPasswordByUserId({ userId }: GetCurrentPasswordByUserIdInput) {
		const userResponse = await this.infra.getUserByUserId({ userId });
		if (!userResponse) return null;

		return {
			password: userResponse.password,
		};
	}
}
