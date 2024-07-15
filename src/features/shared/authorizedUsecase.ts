import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { UseCase } from './useCase';

export class AuthorizedUsecase extends UseCase {
	constructor(private readonly usersClient: UserClient) {
		super();
	}

	protected async isUserAuthorized(username: string): Promise<void> {
		const user = await this.usersClient.getUserByUsername({ username });

		if (!user) throw new Error('Username not authorized.');
	}
}
