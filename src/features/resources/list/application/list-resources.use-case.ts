import { UsecaseResponse } from '@/features/shared/features.types';
import { ResourceApplication, ResourceWithUserInfo } from '../../shared/resources.types';
import { IListResourcesPorts } from './list-resources.ports';
import { ListResourcesInput, ResourceImage } from './list-resources.use-case.types';
import { successResponse } from '@/lib/either';
import { FeatureUsecase } from '@/features/shared/features.use-case';
import { RESOURCES_ERRORS } from '../../shared/resources.constants';

export interface IListResourcesUsecase {
	listResourcesImages(): UsecaseResponse<ResourceImage[]>;
	listResources(input: ListResourcesInput): UsecaseResponse<ResourceWithUserInfo[]>;
}

export class ListResourcesUsecase extends FeatureUsecase implements IListResourcesUsecase {
	constructor(private readonly ports: IListResourcesPorts) {
		super();
	}

	async listResourcesImages() {
		try {
			const response = await this.ports.listResourcesImages();

			return successResponse(response);
		} catch (error) {
			return this.errorUsecaseResponse(error, RESOURCES_ERRORS.LISTING);
		}
	}

	async listResources({ published, itemsPerRequest, cursor, withUserData }: ListResourcesInput) {
		try {
			const resources = await this.ports.listResources({ published, itemsPerRequest, cursor, withUserData });
			const resourcesWithUserInfo = await Promise.all(resources.map((resource) => this.addUserInfoToResource(resource)));

			return successResponse(resourcesWithUserInfo);
		} catch (error) {
			return this.errorUsecaseResponse(error, RESOURCES_ERRORS.LISTING);
		}
	}

	private async addUserInfoToResource(resource: ResourceApplication) {
		const resourceCreatedBy = resource.resourceCreatedBy[0];
		const userResponse = await this.ports.getUserById({ userId: resourceCreatedBy.userId });
		if (!userResponse) throw new Error('Owner of resource not found');

		const resourceCreatedByWithUserInfo = [{ ...resourceCreatedBy, username: userResponse.username }];
		return {
			...resource,
			resourceCreatedBy: resourceCreatedByWithUserInfo,
		} satisfies ResourceWithUserInfo;
	}
}
