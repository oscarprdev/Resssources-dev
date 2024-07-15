import { BucketClient } from '@/services/bucket/bucket.client';
import { EDIT_RESOURCE_ERRORS } from './edit-resource.client.constants';
import { GetUserByUsernameClientInput, UpdateImageClientInput, UpdateResourceClientInput } from './edit-resource.client.types';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { Users as UserStored } from '@prisma/client';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';

export interface IEditResourceClient {
	updateResource(input: UpdateResourceClientInput): Promise<void>;
	updateImage(input: UpdateImageClientInput): Promise<string>;
	getUserByUsername(input: GetUserByUsernameClientInput): Promise<UserStored | null>;
}

export class EditResourceClient implements IEditResourceClient {
	constructor(
		private readonly userClient: UserClient,
		private readonly resourcesClient: ResourcesClient,
		private readonly bucket: BucketClient
	) {}

	async updateResource({ resourceId, resourceUrl, title, description, imgUrl }: UpdateResourceClientInput): Promise<void> {
		try {
			await this.resourcesClient.updateResource({ resourceId, resourceUrl, title, description, imgUrl });
		} catch (error) {
			throw new Error(EDIT_RESOURCE_ERRORS.UPDATTING_RESOURCE);
		}
	}

	async updateImage({ id, imageData, type }: UpdateImageClientInput) {
		try {
			const { imgUrl } = await this.bucket.uploadImage({ id, imageData, type });

			return imgUrl;
		} catch (error) {
			throw new Error(EDIT_RESOURCE_ERRORS.UPDATTING_IMAGE);
		}
	}

	async getUserByUsername({ username }: GetUserByUsernameClientInput) {
		try {
			return await this.userClient.getUserByUsername({ username });
		} catch (error) {
			console.error(error);
			throw new Error(EDIT_RESOURCE_ERRORS.RETRIEVING_USER_BY_USERNAME);
		}
	}
}
