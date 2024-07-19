import { UserStored } from '../types/global.types';
import { UseCase } from './use-case';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export class AuthorizedUsecase extends UseCase {
	constructor(private readonly usersClient: UserClient) {
		super();
	}

	protected async isUserAuthorized(username: string): Promise<UserStored> {
		const user = await this.usersClient.getUserByUsername({ username });

		if (!user) throw new Error('Username not authorized.');

		return user;
	}
}
