import { DESCRIBE_USER_INFRA_ERRORS } from './describe-user.infra.dictionary';
import {
	GetUserByIdInfraInput,
	GetUserByIdInfraOutput,
	GetUserCountsInfraInput,
	GetUserCountsInfraOutput,
	GetUserInfoInfraInput,
	GetUserInfoInfraOutput,
	GetUserSocialMediaInfraInput,
	GetUserSocialMediaInfraOutput,
} from './describe-user.infra.types';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export interface DescribeUserInfra {
	getUserInfo(input: GetUserInfoInfraInput): Promise<GetUserInfoInfraOutput>;
	getUserInfoCounts(input: GetUserCountsInfraInput): Promise<GetUserCountsInfraOutput>;

	getUserById(input: GetUserByIdInfraInput): Promise<GetUserByIdInfraOutput>;

	getUserSocialMedia(input: GetUserSocialMediaInfraInput): Promise<GetUserSocialMediaInfraOutput | null>;
}

export class DefaultDescribeUserInfra implements DescribeUserInfra {
	constructor(
		private readonly userClient: UserClient,
		private readonly resourcesClient: ResourcesClient
	) {}

	async getUserInfo({ username }: GetUserInfoInfraInput) {
		try {
			return this.userClient.getUserByUsername({ username });
		} catch (error) {
			throw new Error(DESCRIBE_USER_INFRA_ERRORS.GET_USER);
		}
	}

	async getUserInfoCounts({ userId }: GetUserCountsInfraInput) {
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

	async getUserById({ userId }: GetUserByIdInfraInput) {
		try {
			return await this.userClient.getUserById({ userId });
		} catch (error) {
			throw new Error(DESCRIBE_USER_INFRA_ERRORS.GET_USER_BY_ID);
		}
	}

	async getUserSocialMedia({ userId }: GetUserSocialMediaInfraInput) {
		try {
			return this.userClient.getUserSocialMedia({ userId });
		} catch (error) {
			throw new Error(DESCRIBE_USER_INFRA_ERRORS.SOCIAL);
		}
	}
}
