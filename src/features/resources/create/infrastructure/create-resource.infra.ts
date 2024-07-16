import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { GetResourceByTitleInput, GetResourceByUrlInput, GetUserByUsernameInput, StoreResourceInput } from './create-resource.infra.types';
import { CREATE_RESOURCE_INFRA_ERRORS } from './create-resource.infra.constants';
import { ResourceStored, UserStored } from '@/features/shared/types/global.types';

export interface ICreateResourceInfra {
	getUserByUsername(input: GetUserByUsernameInput): Promise<UserStored | null>;

	getResourceByTitle(input: GetResourceByTitleInput): Promise<ResourceStored | null>;
	getResourceByUrl(input: GetResourceByUrlInput): Promise<ResourceStored | null>;

	storeResource(input: StoreResourceInput): Promise<void>;
}

export class CreateResourceInfra implements ICreateResourceInfra {
	constructor(private readonly usersClient: UserClient, private readonly resourcesClient: ResourcesClient) {}

	async getUserByUsername({ username }: GetUserByUsernameInput) {
		try {
			return await this.usersClient.getUserByUsername({ username });
		} catch (error) {
			console.error(error);
			throw new Error(CREATE_RESOURCE_INFRA_ERRORS.RETRIEVING_USER_BY_USERNAME);
		}
	}

	async getResourceByTitle({ title }: GetResourceByTitleInput) {
		try {
			return this.resourcesClient.getResourceByTitle({ title });
		} catch (error) {
			console.error(error);
			throw new Error(CREATE_RESOURCE_INFRA_ERRORS.RETRIEVING_RESOURCE_BY_TITLE);
		}
	}

	async getResourceByUrl({ resourceUrl }: GetResourceByUrlInput) {
		try {
			return this.resourcesClient.getResourceByUrl({ resourceUrl });
		} catch (error) {
			console.error(error);
			throw new Error(CREATE_RESOURCE_INFRA_ERRORS.RETRIEVING_RESOURCE_BY_URL);
		}
	}

	async storeResource({ resourceId, resourceUrl, title, description, faviconUrl, imgUrl, kinds, ownerId }: StoreResourceInput) {
		try {
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
		} catch (error) {
			console.error(error);
			throw new Error(CREATE_RESOURCE_INFRA_ERRORS.STORING_RESOURCE);
		}
	}
}
