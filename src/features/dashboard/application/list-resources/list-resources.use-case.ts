import { Either, errorResponse, successResponse } from '@/lib/either';
import { Resources as Resource } from '@prisma/client';
import { ListResourcesPorts } from './list-resources.ports';
import { LIST_RESOURCES_ERRORS } from './list-resources.use-case.constants';
import { GetResourcesListInput } from './list-resources.use-case.types';

export interface IListResourcesUsecase {
	getResources(input: GetResourcesListInput): Promise<Either<string, Resource[]>>;
}

export class ListResourcesUsecase implements IListResourcesUsecase {
	constructor(private readonly ports: ListResourcesPorts) {}

	async getResources({ lastResourceId, pageSize }: GetResourcesListInput) {
		try {
			const resources = await this.ports.getResources({ lastResourceId, pageSize, withUserData: true });

			console.log(resources);
			return successResponse(resources);
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : LIST_RESOURCES_ERRORS.DEFAULT_ERROR);
		}
	}
}
