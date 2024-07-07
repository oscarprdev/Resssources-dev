import { Users as User } from '@prisma/client';
import { CreateUserInfraInput, GetUserByCredentialsInfraInput, GetUserByUsername } from './auth-user.infra.types';
import { UserClient } from '@/services/prisma/users/prisma-user.client';

export interface IAuthUserInfra {
	getUserByUsername(input: GetUserByUsername): Promise<User | null>;
	getUserByCredentials(input: GetUserByCredentialsInfraInput): Promise<User | null>;
	createUser(input: CreateUserInfraInput): Promise<User>;
}

export class AuthUserInfra implements IAuthUserInfra {
	constructor(private readonly client: UserClient) {}

	async getUserByUsername({ username }: GetUserByUsername) {
		return await this.client.getUserByUsername({ username });
	}

	async getUserByCredentials({ username, password }: GetUserByCredentialsInfraInput) {
		return await this.client.getUserByCredentials({ username, password });
	}

	async createUser({ username, password, email, role }: CreateUserInfraInput) {
		return await this.client.createUser({ username, password, email, role });
	}
}
