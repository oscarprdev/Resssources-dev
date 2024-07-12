import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { Resources as Resource, Users as User } from '@prisma/client';
import { LIST_RESOURCES_ERRORS } from './list-resources.client.constants';
import { GetResourcesListInput, GetUserByIdInput } from './list-resources.client.types';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { ResourceWithRelations } from '@/services/prisma/clients/resources/prisma-resources.types';

export interface IListResourcesClient {
	listResources(input: GetResourcesListInput): Promise<ResourceWithRelations[]>;
	getUserById(input: GetUserByIdInput): Promise<User | null>;
}

export class ListResourcesClient implements IListResourcesClient {
	constructor(private readonly resourcesClient: ResourcesClient, private readonly usersClient: UserClient) {}

	async listResources({ cursor, pageSize, withUserData }: GetResourcesListInput) {
		try {
			return await this.resourcesClient.getResourcesList({ cursor, pageSize, withUserData });
		} catch (error) {
			throw new Error(LIST_RESOURCES_ERRORS.LISTING_RESOURCES);
		}
	}

	async getUserById({ userId }: GetUserByIdInput): Promise<User | null> {
		try {
			return await this.usersClient.getUserById({ userId });
		} catch (error) {
			console.log(error);
			throw new Error(LIST_RESOURCES_ERRORS.RETRIEVING_USER_BY_ID);
		}
	}
}
