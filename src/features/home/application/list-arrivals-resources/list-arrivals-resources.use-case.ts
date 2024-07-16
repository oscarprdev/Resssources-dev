import { ResourceApplication, ResourceWithUserInfo } from '@/features/shared/types/global.types';
import { Either, errorResponse, successResponse } from '@/lib/either';
import { ListArrivalsResourcesPorts } from './list-arrivals-resources.ports';

export interface IListArrivalsResourcesUsecase {
	listArrivalsResources(): Promise<Either<string, ResourceWithUserInfo[]>>;
}

export class ListArrivalsResourcesUsecase implements IListArrivalsResourcesUsecase {
	constructor(private readonly ports: ListArrivalsResourcesPorts) {}

	async listArrivalsResources() {
		try {
			const resources = await this.ports.listArrivalsResources({ published: true, limit: 10 });
			const resourcesWithUserInfo = await Promise.all(resources.map((resource) => this.addUserInfoToResource(resource)));

			return successResponse(resourcesWithUserInfo);
		} catch (e) {
			return errorResponse(e instanceof Error ? e.message : 'Error listing new arrivals resources');
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
