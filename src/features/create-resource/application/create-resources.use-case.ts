import { Either, errorResponse, isError, successResponse } from '@/lib/either';
import { CreateResourceInput } from './create-resources.types';
import { CreateResourcesPorts, StoreResourceInput } from './create-resources.ports';
import { createResourceInputSchema } from './create-resources.schemas';
import { UseCase } from '@/features/shared/useCase';

export interface ICreateResourcesUsecase {
	createResource(input: CreateResourceInput): Promise<Either<string, string>>;
}

export class CreateResourceUsecase extends UseCase implements ICreateResourcesUsecase {
	constructor(private readonly ports: CreateResourcesPorts) {
		super();
	}

	async createResource(input: CreateResourceInput): Promise<Either<string, string>> {
		try {
			this.validateInput(input, createResourceInputSchema, 'Invalid Create Resource Input');

			const { id: ownerId } = await this.getUserByUsername(input.username);
			const { title, description, faviconUrl } = await this.generateResourceData(input.resourceUrl);
			const { imageData } = await this.takeScreenshot(input.resourceUrl);
			const { resourceId, imgUrl } = await this.storeResourceImageInBucket(imageData);

			await this.storeResource({
				ownerId,
				resourceId,
				title,
				description,
				faviconUrl,
				imgUrl,
				resourceUrl: input.resourceUrl,
				kind: input.kind,
			});

			return successResponse('Resource created successfully');
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : 'Error creating resource');
		}
	}

	private async getUserByUsername(username: string) {
		const response = await this.ports.getUserByUsername({ username });

		return this.usePortResponse(response);
	}

	private async generateResourceData(resourceUrl: string) {
		const response = await this.ports.generateResourceData({ resourceUrl });

		return this.usePortResponse(response);
	}

	private async takeScreenshot(resourceUrl: string) {
		const response = await this.ports.takeScreenshot({ resourceUrl });

		return this.usePortResponse(response);
	}

	private async storeResourceImageInBucket(imageData: Buffer) {
		const response = await this.ports.storeResourceImageInBucket({ imageData });

		return this.usePortResponse(response);
	}

	private async storeResource(input: StoreResourceInput) {
		const response = await this.ports.storeResource(input);

		return this.usePortResponse(response);
	}
}
