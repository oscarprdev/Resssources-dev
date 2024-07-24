import {
	EditUseProfilePortsInput,
	EditUserCredentialsPortsInput,
	EditUserInfoPortsInput,
	EditUserPorts,
	GetCurrentPasswordByUserIdPortsInput,
	GetCurrentPasswordByUserIdPortsOutput,
	UploadImagePortsInput,
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

	async getCurrentPasswordByUserId({ userId }: GetCurrentPasswordByUserIdPortsInput) {
		const userResponse = await this.infra.getUserByUserId({ userId });
		if (!userResponse) return null;

		return {
			password: userResponse.password,
		};
	}

	async editUserProfile({ userId, description, imgUrl }: EditUseProfilePortsInput) {
		await this.infra.editUserProfile({ userId, description, profileImage: imgUrl });
	}

	async uploadImage(input: UploadImagePortsInput) {
		return await this.infra.uploadImage(input);
	}
}
