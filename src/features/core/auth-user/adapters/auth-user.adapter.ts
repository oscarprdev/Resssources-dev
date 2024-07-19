import {
	AuthUserPorts,
	CreateUserInput,
	GetUserByCredentialsInput,
	GetUserByUsernameInput,
} from '../application/auth-user.ports';
import { IAuthUserInfra } from '../infrastructure/auth-user.infra';

export class AuthUserAdapter implements AuthUserPorts {
	constructor(private readonly infra: IAuthUserInfra) {}

	async getUserByCredentials(input: GetUserByCredentialsInput) {
		const userInfra = await this.infra.getUserByCredentials(input);
		if (!userInfra) return null;

		return {
			username: userInfra.username,
			email: userInfra.email,
			password: userInfra.password,
		};
	}

	async getUserByUsername(input: GetUserByUsernameInput) {
		const userInfra = await this.infra.getUserByUsername(input);
		if (!userInfra) return null;

		return {
			username: userInfra.username,
			password: userInfra.password,
			role: userInfra.role,
		};
	}

	async createUser(input: CreateUserInput) {
		const userInfra = await this.infra.createUser(input);

		return {
			id: userInfra.id,
		};
	}
}
