import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { UseCase } from './use-case';
import { UserStored } from '../types/global.types';

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
