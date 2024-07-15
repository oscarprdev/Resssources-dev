import { UseCase } from '@/features/shared/useCase';
import { Either, errorResponse, successResponse } from '@/lib/either';
import { UpdateImageInput, UpdateImageOutput, UpdateResourceInfoInput } from './edit-resource.types';
import { EditResourcePorts } from './edit-resource.ports';
import { EDIT_RESOURCES_ERRORS, EDIT_RESOURCES_SUCCESS } from './edit-resource.constants';
import { editResourceInputSchema } from './edit-resource.schemas';

export interface IEditResourceUsecase {
	updateImage(input: UpdateImageInput): Promise<Either<string, UpdateImageOutput>>;
	updateResourceInfo(input: UpdateResourceInfoInput): Promise<Either<string, string>>;
}

export const MAX_FILE_SIZE_MB = 2;

export default class EditResourceUsecase extends UseCase implements IEditResourceUsecase {
	constructor(private readonly ports: EditResourcePorts) {
		super();
	}

	async updateResourceInfo(input: UpdateResourceInfoInput) {
		try {
			this.validateInput(input, editResourceInputSchema, EDIT_RESOURCES_ERRORS.INVALID_INPUT);
			const isUserValid = await this.checkIfUserIsValid(input.username);
			if (!isUserValid) return errorResponse(EDIT_RESOURCES_ERRORS.INVALID_USERNAME);

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

			const isUserValid = await this.checkIfUserIsValid(username);

			if (!isUserValid) return errorResponse(EDIT_RESOURCES_ERRORS.INVALID_USERNAME);
			if (!image) return errorResponse(EDIT_RESOURCES_ERRORS.INVALID_IMAGE);
			if (this.isImageSizeTooBig(image)) return errorResponse(EDIT_RESOURCES_ERRORS.IMAGE_SIZE);
			if (!resourceId) return errorResponse(EDIT_RESOURCES_ERRORS.RESOURCE_NOT_VALID);

			const imageId = `${username}/${resourceId}`;

			const response = await this.ports.updateImage({ id: imageId, imageFile: image });

			return successResponse({ imgUrl: response });
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : EDIT_RESOURCES_ERRORS.DEFAULT);
		}
	}

	private async checkIfUserIsValid(username: string): Promise<boolean> {
		const user = await this.ports.getUserByUsername({ username });

		return Boolean(user);
	}

	private isImageSizeTooBig(image: File) {
		return image.size > MAX_FILE_SIZE_MB * 1024 * 1024;
	}
}
