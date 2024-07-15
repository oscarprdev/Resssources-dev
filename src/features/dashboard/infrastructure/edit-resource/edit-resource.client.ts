import { BucketClient } from '@/services/bucket/bucket.client';
import { EDIT_RESOURCE_ERRORS } from './edit-resource.client.constants';
import { UpdateImageClientInput, UpdateResourceClientInput, UpdateResourcePublishedClientInput } from './edit-resource.client.types';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';

export interface IEditResourceClient {
	updateResource(input: UpdateResourceClientInput): Promise<void>;
	updateResourcePublished(input: UpdateResourcePublishedClientInput): Promise<void>;
	updateImage(input: UpdateImageClientInput): Promise<string>;
}

export class EditResourceClient implements IEditResourceClient {
	constructor(private readonly resourcesClient: ResourcesClient, private readonly bucket: BucketClient) {}

	async updateResourcePublished({ resourceId, published }: UpdateResourcePublishedClientInput): Promise<void> {
		try {
			await this.resourcesClient.updateResourcePublished({ resourceId, published });
		} catch (error) {
			throw new Error(EDIT_RESOURCE_ERRORS.UPDATTING_RESOURCE);
		}
	}

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
}
