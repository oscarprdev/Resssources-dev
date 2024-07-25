import { RESOURCES_INFRA_ERRORS } from '../../shared/resources.constants';
import {
	GetResourcesCountInfraInput,
	GetUserByIdInfraInput,
	ListResourcesBySearchInfraInput,
	ListResourcesInfraInput,
} from './list-resources.infra.types';
import { ResourceStored, UserStored } from '@/features/shared/types/global.types';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { ResourceWithRelations } from '@/services/prisma/clients/resources/prisma-resources.types';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export interface IListResourcesInfra {
	listResources(input: ListResourcesInfraInput): Promise<ResourceWithRelations[]>;
	listResourcesBySearch(input: ListResourcesBySearchInfraInput): Promise<ResourceStored[]>;

	getUserById(input: GetUserByIdInfraInput): Promise<UserStored | null>;
	getResourcesCount(input: GetResourcesCountInfraInput): Promise<number>;
}

export class ListResourcesInfra implements IListResourcesInfra {
	constructor(
		private readonly resourceClient: ResourcesClient,
		private readonly usersClient: UserClient
	) {}

	async listResources({ userId, published, itemsPerRequest, cursor, kinds, withUserData }: ListResourcesInfraInput) {
		try {
			return await this.resourceClient.getResourcesList({
				userId,
				published,
				withUserData,
				pagination: { pageSize: itemsPerRequest, cursor },
				filters: {
					kinds,
				},
			});
		} catch (error) {
			throw new Error(RESOURCES_INFRA_ERRORS.LISTING);
		}
	}

	async listResourcesBySearch({ cursor, itemsPerRequest, value, kinds }: ListResourcesBySearchInfraInput) {
		try {
			return await this.resourceClient.getResourcesListBySearch({ cursor, itemsPerRequest, value, kinds });
		} catch (error) {
			throw new Error(RESOURCES_INFRA_ERRORS.SEARCHING);
		}
	}

	async getUserById({ userId }: GetUserByIdInfraInput) {
		try {
			return await this.usersClient.getUserById({ userId });
		} catch (error) {
			throw new Error(RESOURCES_INFRA_ERRORS.USER_BY_ID);
		}
	}

	async getResourcesCount(input: GetResourcesCountInfraInput) {
		try {
			return await this.resourceClient.getResourcesCount(input);
		} catch (error) {
			throw new Error(RESOURCES_INFRA_ERRORS.COUNTING);
		}
	}
}
