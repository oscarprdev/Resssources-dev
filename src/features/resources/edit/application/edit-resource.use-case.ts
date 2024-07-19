import { EDIT_RESOURCES_ERRORS, EDIT_RESOURCES_SUCCESS } from './edit-resource.constants';
import { EditResourcePorts } from './edit-resource.ports';
import {
	editResourceFavInputSchema,
	editResourceInputSchema,
	editResourcePublishedInputSchema,
} from './edit-resource.schemas';
import {
	UpdateImageInput,
	UpdateImageOutput,
	UpdateResourceFavInput,
	UpdateResourceInfoInput,
	UpdateResourcePublishedInput,
} from './edit-resource.types';
import { UsecaseResponse } from '@/features/shared/features.types';
import { AuthorizedUsecase } from '@/features/shared/usecases/authorized.use-case';
import { Either, errorResponse, successResponse } from '@/lib/either';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export interface IEditResourceUsecase {
	updateImage(input: UpdateImageInput): UsecaseResponse<UpdateImageOutput>;
	updateResourceInfo(input: UpdateResourceInfoInput): UsecaseResponse<string>;
	updateResourcePublished(input: UpdateResourcePublishedInput): UsecaseResponse<string>;
	updateResourceFav(input: UpdateResourceFavInput): UsecaseResponse<string>;
}

export const MAX_FILE_SIZE_MB = 5;

export class EditResourceUsecase extends AuthorizedUsecase implements IEditResourceUsecase {
	constructor(
		private readonly ports: EditResourcePorts,
		private readonly userClient: UserClient
	) {
		super(userClient);
	}

	async updateResourceFav(input: UpdateResourceFavInput) {
		try {
			this.validateInput(input, editResourceFavInputSchema, EDIT_RESOURCES_ERRORS.INVALID_INPUT);
			const user = await this.isUserAuthorized(input.username);

			if (input.favourited) {
				await this.ports.addResourceFav({
					resourceId: input.resourceId,
					userId: user.id,
				});
			} else {
				await this.ports.removeResourceFav({
					resourceId: input.resourceId,
					userId: user.id,
				});
			}

			return successResponse(EDIT_RESOURCES_SUCCESS.DEFAULT);
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : EDIT_RESOURCES_ERRORS.DEFAULT);
		}
	}

	async updateResourcePublished(input: UpdateResourcePublishedInput): Promise<Either<string, string>> {
		try {
			this.validateInput(input, editResourcePublishedInputSchema, EDIT_RESOURCES_ERRORS.INVALID_INPUT);
			await this.isUserAuthorized(input.username);

			await this.ports.updateResourcePublished({
				resourceId: input.resourceId,
				published: input.published,
			});

			return successResponse(EDIT_RESOURCES_SUCCESS.VISIBILITY);
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : EDIT_RESOURCES_ERRORS.DEFAULT);
		}
	}

	async updateResourceInfo(input: UpdateResourceInfoInput) {
		try {
			this.validateInput(input, editResourceInputSchema, EDIT_RESOURCES_ERRORS.INVALID_INPUT);
			await this.isUserAuthorized(input.username);

			await this.ports.updateResourceInfo({
				resourceId: input.resourceId,
				title: input.title,
				description: input.description,
				imgUrl: input.imgUrl,
				resourceUrl: input.resourceUrl,
			});

			return successResponse(EDIT_RESOURCES_SUCCESS.DEFAULT);
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : EDIT_RESOURCES_ERRORS.DEFAULT);
		}
	}

	async updateImage({ formData }: UpdateImageInput) {
		try {
			const image = formData.get('image') as File;
			const username = formData.get('username') as string;
			const resourceId = formData.get('resourceId') as string;

			await this.isUserAuthorized(username);

			if (!image) return errorResponse(EDIT_RESOURCES_ERRORS.INVALID_IMAGE);
			if (this.isImageSizeTooBig(image)) return errorResponse(EDIT_RESOURCES_ERRORS.IMAGE_SIZE);
			if (!resourceId) return errorResponse(EDIT_RESOURCES_ERRORS.RESOURCE_NOT_VALID);

			const imageId = `${username}/${resourceId}`;

			const response = await this.ports.updateImage({
				id: imageId,
				imageFile: image,
			});

			return successResponse({ imgUrl: response });
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : EDIT_RESOURCES_ERRORS.DEFAULT);
		}
	}

	private isImageSizeTooBig(image: File) {
		return image.size > MAX_FILE_SIZE_MB * 1024 * 1024;
	}
}
