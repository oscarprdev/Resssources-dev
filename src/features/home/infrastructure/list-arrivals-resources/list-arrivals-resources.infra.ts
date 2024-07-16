import { GLOBAL_ERRORS } from '@/features/shared/constants/global-constants';
import { UserStored } from '@/features/shared/types/global.types';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { GetUserByIdInfraInput, ListArrivalResourcesInfraInput } from './list-arrivals-resources.infra.types';
import { ResourceWithRelations } from '@/services/prisma/clients/resources/prisma-resources.types';

export interface IListArrivalsResourcesInfra {
	listArrivalResources(input: ListArrivalResourcesInfraInput): Promise<ResourceWithRelations[]>;
	getUserById(input: GetUserByIdInfraInput): Promise<UserStored | null>;
}

export class ListArrivalsResourcesInfra implements IListArrivalsResourcesInfra {
	constructor(private readonly resourceClient: ResourcesClient, private readonly usersClient: UserClient) {}

	async listArrivalResources({ published, limit }: ListArrivalResourcesInfraInput) {
		try {
			return await this.resourceClient.getResourcesList({
				published,
				withUserData: true,
				pagination: { pageSize: limit, cursor: null },
			});
		} catch (error) {
			throw new Error(GLOBAL_ERRORS.LIST_RESOURCES);
		}
	}

	async getUserById({ userId }: GetUserByIdInfraInput) {
		try {
			return this.usersClient.getUserById({ userId });
		} catch (error) {
			throw new Error(GLOBAL_ERRORS.USER_BY_ID);
		}
	}
}
