import { Either, errorResponse, successResponse } from '@/lib/either';
import { ListResourcesPorts } from './list-resources.ports';
import { LIST_RESOURCES_ERRORS } from './list-resources.use-case.constants';
import { GetResourcesListInput } from './list-resources.use-case.types';
import { ResourceApplication, ResourceWithUserInfo } from '@/features/shared/types/global.types';

export interface IListResourcesUsecase {
	getResources(input: GetResourcesListInput): Promise<Either<string, ResourceWithUserInfo[]>>;
}

export class ListResourcesUsecase implements IListResourcesUsecase {
	constructor(private readonly ports: ListResourcesPorts) {}

	async getResources({ lastResourceId, pageSize }: GetResourcesListInput) {
		try {
			const resources = await this.ports.getResources({ lastResourceId, pageSize, withUserData: true });

			const resourcesWithUserInfo = await Promise.all(resources.map((resource) => this.addUserInfoToResource(resource)));

			return successResponse(resourcesWithUserInfo);
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : LIST_RESOURCES_ERRORS.DEFAULT_ERROR);
		}
	}

	private async addUserInfoToResource(resource: ResourceApplication) {
		const resourceCreatedBy = resource.resourceCreatedBy[0];
		const userResponse = await this.ports.getUserById({ userId: resourceCreatedBy.userId });

		const resourceCreatedByWithUserInfo = [{ ...resourceCreatedBy, username: userResponse ? userResponse.username : null }];
		return {
			...resource,
			resourceCreatedBy: resourceCreatedByWithUserInfo,
		} satisfies ResourceWithUserInfo;
	}
}
