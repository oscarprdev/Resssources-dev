import { RESOURCE_KIND_VALUES } from '../../create/application/create-resources.schemas';
import { RESOURCES_INFRA_ERRORS } from '../../shared/resources.constants';
import { GetUserByIdInfraInput, ListResourcesInfraInput } from './list-resources.infra.types';
import { UserStored } from '@/features/shared/types/global.types';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { ResourceWithRelations } from '@/services/prisma/clients/resources/prisma-resources.types';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export interface IListResourcesInfra {
	listResources(input: ListResourcesInfraInput): Promise<ResourceWithRelations[]>;
	getUserById(input: GetUserByIdInfraInput): Promise<UserStored | null>;
}

export class ListResourcesInfra {
	constructor(
		private readonly resourceClient: ResourcesClient,
		private readonly usersClient: UserClient
	) {}

	async listResources({ published, itemsPerRequest, cursor, kinds, withUserData }: ListResourcesInfraInput) {
		try {
			return await this.resourceClient.getResourcesList({
				published,
				withUserData,
				pagination: { pageSize: itemsPerRequest, cursor: cursor },
				filters: {
					kinds: kinds || RESOURCE_KIND_VALUES,
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
}
