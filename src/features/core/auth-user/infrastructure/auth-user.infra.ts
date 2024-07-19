import { AUTH_USER_INFRA_ERRORS } from './auth-user.infra.constants';
import { CreateUserInfraInput, GetUserByCredentialsInfraInput, GetUserByUsername } from './auth-user.infra.types';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { Users as User } from '@prisma/client';

export interface IAuthUserInfra {
	getUserByUsername(input: GetUserByUsername): Promise<User | null>;
	getUserByCredentials(input: GetUserByCredentialsInfraInput): Promise<User | null>;
	createUser(input: CreateUserInfraInput): Promise<User>;
}

export class AuthUserInfra implements IAuthUserInfra {
	constructor(private readonly client: UserClient) {}

	async getUserByUsername({ username }: GetUserByUsername) {
		try {
			return await this.client.getUserByUsername({ username });
		} catch (error) {
			throw new Error(AUTH_USER_INFRA_ERRORS.RETRIEVING_USER_BY_USERNAME);
		}
	}

	async getUserByCredentials({ username, password }: GetUserByCredentialsInfraInput) {
		try {
			return await this.client.getUserByCredentials({ username, password });
		} catch (error) {
			throw new Error(AUTH_USER_INFRA_ERRORS.RETRIEVING_USER_BY_CREDENTIALS);
		}
	}

	async createUser({ username, password, email, role }: CreateUserInfraInput) {
		try {
			return await this.client.createUser({ username, password, email, role });
		} catch (error) {
			throw new Error(AUTH_USER_INFRA_ERRORS.CREATING_USER);
		}
	}
}
