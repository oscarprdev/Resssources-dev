import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { GetUserByUsernameInput, StoreResourceInput } from './create-resource.infra.types';
import { Users as UserStored } from '@prisma/client';

export interface ICreateResourceInfra {
	getUserByUsername(input: GetUserByUsernameInput): Promise<UserStored | null>;
	storeResource(input: StoreResourceInput): Promise<void>;
}

export class CreateResourceInfra implements ICreateResourceInfra {
	constructor(private readonly usersClient: UserClient, private readonly resourcesClient: ResourcesClient) {}

	async getUserByUsername({ username }: GetUserByUsernameInput) {
		return await this.usersClient.getUserByUsername({ username });
	}

	async storeResource({ resourceId, resourceUrl, title, description, faviconUrl, imgUrl, kinds, ownerId }: StoreResourceInput) {
		await this.resourcesClient.createResource({
			resourceId,
			resourceUrl,
			title,
			description,
			faviconUrl,
			imgUrl,
			kinds,
			ownerId,
		});
	}
}
