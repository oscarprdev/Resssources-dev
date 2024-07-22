import { DESCRIBE_USER_INFRA_ERRORS } from './describe-user.infra.dictionary';
import {
	GetUserCountsInfraInput,
	GetUserCountsInfraOutput,
	GetUserInfoInfraInput,
	GetUserInfoInfraOutput,
} from './describe-user.infra.types';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export interface DescribeUserInfra {
	getUserInfo(input: GetUserInfoInfraInput): Promise<GetUserInfoInfraOutput>;
	getUserInfoCounts(input: GetUserCountsInfraInput): Promise<GetUserCountsInfraOutput>;
}

export class DefaultDescribeUserInfra implements DescribeUserInfra {
	constructor(
		private readonly userClient: UserClient,
		private readonly resourcesClient: ResourcesClient
	) {}

	async getUserInfo({ userId }: GetUserInfoInfraInput) {
		try {
			return this.userClient.getUserById({ userId });
		} catch (error) {
			throw new Error(DESCRIBE_USER_INFRA_ERRORS.GET_USER);
		}
	}

	async getUserInfoCounts({ userId }: GetUserCountsInfraInput): Promise<GetUserCountsInfraOutput> {
		try {
			const [createdCount, favCount] = await Promise.all([
				this.resourcesClient.getResourcesByOwnerCount({ userId }),
				this.resourcesClient.getResourcesFavCount({ userId }),
			]);

			return {
				createdCount,
				favCount,
			};
		} catch (error) {
			throw new Error(DESCRIBE_USER_INFRA_ERRORS.COUNT);
		}
	}
}
