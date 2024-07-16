import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { GetUserByIdInfraInput, ListResourcesInfraInput } from './list-resources.infra.types';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { RESOURCES_INFRA_ERRORS } from '../../shared/resources.constants';
import { UserStored } from '@/features/shared/types/global.types';
import { ResourceWithRelations } from '@/services/prisma/clients/resources/prisma-resources.types';

export interface IListResourcesInfra {
	listResources(input: ListResourcesInfraInput): Promise<ResourceWithRelations[]>;
	getUserById(input: GetUserByIdInfraInput): Promise<UserStored | null>;
}

export class ListResourcesInfra {
	constructor(private readonly resourceClient: ResourcesClient, private readonly usersClient: UserClient) {}

	async listResources({ published, itemsPerRequest, cursor, withUserData }: ListResourcesInfraInput) {
		try {
			return await this.resourceClient.getResourcesList({
				published,
				withUserData,
				pagination: { pageSize: itemsPerRequest, cursor: cursor },
			});
		} catch (error) {
			throw new Error(RESOURCES_INFRA_ERRORS.LISTING);
		}
	}

	async getUserById({ userId }: GetUserByIdInfraInput) {
		try {
			return this.usersClient.getUserById({ userId });
		} catch (error) {
			throw new Error(RESOURCES_INFRA_ERRORS.USER_BY_ID);
		}
	}
}
