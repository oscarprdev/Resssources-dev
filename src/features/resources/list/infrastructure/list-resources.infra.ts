import { RESOURCES_INFRA_ERRORS } from '../../shared/resources.constants';
import {
	GetResourcesCountInfraInput,
	GetUserByIdInfraInput,
	ListResourcesInfraInput,
} from './list-resources.infra.types';
import { UserStored } from '@/features/shared/types/global.types';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { ResourceWithRelations } from '@/services/prisma/clients/resources/prisma-resources.types';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export interface IListResourcesInfra {
	listResources(input: ListResourcesInfraInput): Promise<ResourceWithRelations[]>;
	getUserById(input: GetUserByIdInfraInput): Promise<UserStored | null>;
	getResourcesCount(input: GetResourcesCountInfraInput): Promise<number>;
}

export class ListResourcesInfra implements IListResourcesInfra {
	constructor(
		private readonly resourceClient: ResourcesClient,
		private readonly usersClient: UserClient
	) {}

	async listResources({ published, itemsPerRequest, cursor, kinds, withUserData }: ListResourcesInfraInput) {
		try {
			return await this.resourceClient.getResourcesList({
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

	async getUserById({ userId }: GetUserByIdInfraInput) {
		try {
			return this.usersClient.getUserById({ userId });
		} catch (error) {
			throw new Error(RESOURCES_INFRA_ERRORS.USER_BY_ID);
		}
	}

	async getResourcesCount(input: GetResourcesCountInfraInput) {
		try {
			return this.resourceClient.getResourcesCount(input);
		} catch (error) {
			throw new Error(RESOURCES_INFRA_ERRORS.COUNTING);
		}
	}
}
