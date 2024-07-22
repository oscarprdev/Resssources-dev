import { EditUserCredentialsInfraInput, EditUserInfoInfraInput } from './edit-user.infra.types';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export interface EditUserInfra {
	editInfo(input: EditUserInfoInfraInput): Promise<void>;
	editCredentials(input: EditUserCredentialsInfraInput): Promise<void>;
}

export class DefaultEditUserInfra implements EditUserInfra {
	constructor(private readonly userClient: UserClient) {}

	async editInfo({ userId, email }: EditUserInfoInfraInput) {
		await this.userClient.editInfo({ userId, email });
	}

	async editCredentials({ userId, password }: EditUserCredentialsInfraInput) {
		await this.userClient.editCredentials({ userId, password });
	}
}
