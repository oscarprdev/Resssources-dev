import { EDIT_RESOURCE_ERRORS } from './edit-resource.client.constants';
import {
	UpdateImageClientInput as UpdateImageInfraInput,
	UpdateResourceFavInfraInput,
	UpdateResourceClientInput as UpdateResourceInfraInput,
	UpdateResourcePublishedClientInput as UpdateResourcePublishedInfraInput,
} from './edit-resource.client.types';
import { BucketClient } from '@/services/bucket/bucket.client';
import { ResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';

export interface IEditResourceInfra {
	updateResource(input: UpdateResourceInfraInput): Promise<void>;
	updateResourcePublished(input: UpdateResourcePublishedInfraInput): Promise<void>;
	updateImage(input: UpdateImageInfraInput): Promise<string>;

	addResourceFav(input: UpdateResourceFavInfraInput): Promise<void>;
	removeResourceFav(input: UpdateResourceFavInfraInput): Promise<void>;
}

export class EditResourceInfra implements IEditResourceInfra {
	constructor(
		private readonly resourcesClient: ResourcesClient,
		private readonly bucket: BucketClient
	) {}

	async addResourceFav({ resourceId, userId }: UpdateResourceFavInfraInput) {
		try {
			await this.resourcesClient.addResourceFav({ resourceId, userId });
		} catch (error) {
			throw new Error(EDIT_RESOURCE_ERRORS.UPDATTING_RESOURCE);
		}
	}

	async removeResourceFav({ resourceId, userId }: UpdateResourceFavInfraInput): Promise<void> {
		try {
			await this.resourcesClient.removeResourceFav({ resourceId, userId });
		} catch (error) {
			throw new Error(EDIT_RESOURCE_ERRORS.REMOVING_FAV);
		}
	}

	async updateResourcePublished({ resourceId, published }: UpdateResourcePublishedInfraInput): Promise<void> {
		try {
			await this.resourcesClient.updateResourcePublished({
				resourceId,
				published,
			});
		} catch (error) {
			throw new Error(EDIT_RESOURCE_ERRORS.UPDATTING_RESOURCE);
		}
	}

	async updateResource({
		resourceId,
		resourceUrl,
		title,
		description,
		imgUrl,
	}: UpdateResourceInfraInput): Promise<void> {
		try {
			await this.resourcesClient.updateResource({
				resourceId,
				resourceUrl,
				title,
				description,
				imgUrl,
			});
		} catch (error) {
			throw new Error(EDIT_RESOURCE_ERRORS.UPDATTING_RESOURCE);
		}
	}

	async updateImage({ id, imageData, type }: UpdateImageInfraInput) {
		try {
			const { imgUrl } = await this.bucket.uploadImage({ id, imageData, type });

			return imgUrl;
		} catch (error) {
			throw new Error(EDIT_RESOURCE_ERRORS.UPDATTING_IMAGE);
		}
	}
}
