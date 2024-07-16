import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { LIST_RESOURCES_ERRORS } from './list-resources.client.constants';
import { GetResourcesListInput, GetUserByIdInput } from './list-resources.client.types';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { ResourceWithRelations } from '@/services/prisma/clients/resources/prisma-resources.types';
import { UserStored } from '@/features/shared/types/global.types';

export interface IListResourcesClient {
	listResources(input: GetResourcesListInput): Promise<ResourceWithRelations[]>;
	getUserById(input: GetUserByIdInput): Promise<UserStored | null>;
}

export class ListResourcesClient implements IListResourcesClient {
	constructor(private readonly resourcesClient: ResourcesClient, private readonly usersClient: UserClient) {}

	async listResources({ cursor, pageSize, withUserData }: GetResourcesListInput) {
		try {
			return await this.resourcesClient.getResourcesList({ withUserData, pagination: { cursor, pageSize } });
		} catch (error) {
			throw new Error(LIST_RESOURCES_ERRORS.LISTING_RESOURCES);
		}
	}

	async getUserById({ userId }: GetUserByIdInput): Promise<UserStored | null> {
		try {
			return await this.usersClient.getUserById({ userId });
		} catch (error) {
			console.log(error);
			throw new Error(LIST_RESOURCES_ERRORS.RETRIEVING_USER_BY_ID);
		}
	}
}
