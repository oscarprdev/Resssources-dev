import { RESOURCE_KIND_VALUES } from '../../create/application/create-resources.schemas';
import { RESOURCES_ERRORS } from '../../shared/resources.constants';
import { ResourceApplication, ResourceWithUserInfo } from '../../shared/resources.types';
import { IListResourcesPorts } from './list-resources.ports';
import { ListResourcesInput, ListResourcesOutput, ResourceImage } from './list-resources.use-case.types';
import { UsecaseResponse } from '@/features/shared/features.types';
import { FeatureUsecase } from '@/features/shared/features.use-case';
import { successResponse } from '@/lib/either';

export interface IListResourcesUsecase {
	listResourcesImages(): UsecaseResponse<ResourceImage[]>;
	listResources(input: ListResourcesInput): UsecaseResponse<ListResourcesOutput>;
}

export class ListResourcesUsecase extends FeatureUsecase implements IListResourcesUsecase {
	constructor(private readonly ports: IListResourcesPorts) {
		super();
	}

	async listResourcesImages() {
		try {
			const response = await this.ports.listResourcesImages({ kinds: RESOURCE_KIND_VALUES });

			return successResponse(response);
		} catch (error) {
			return this.errorUsecaseResponse(error, RESOURCES_ERRORS.LISTING);
		}
	}

	async listResources({ published, itemsPerRequest, cursor, kinds, withUserData }: ListResourcesInput) {
		try {
			const [resources, count] = await Promise.all([
				this.ports.listResources({
					published,
					itemsPerRequest,
					cursor,
					withUserData,
					kinds: kinds || RESOURCE_KIND_VALUES,
				}),
				this.ports.getResourcesCount({
					published,
					cursor,
					kinds: kinds || RESOURCE_KIND_VALUES,
				}),
			]);
			const resourcesWithUserInfo = await Promise.all(
				resources.map(resource => this.addUserInfoToResource(resource))
			);

			return successResponse({
				items: resourcesWithUserInfo,
				moreItems: itemsPerRequest ? count - 1 > itemsPerRequest : false,
				cursor: resources.length > 0 ? resources[resources.length - 1].id : undefined,
			});
		} catch (error) {
			return this.errorUsecaseResponse(error, RESOURCES_ERRORS.LISTING);
		}
	}

	private async addUserInfoToResource(resource: ResourceApplication) {
		const resourceCreatedBy = resource.resourceCreatedBy[0];
		const userResponse = await this.ports.getUserById({
			userId: resourceCreatedBy.userId,
		});
		if (!userResponse) throw new Error('Owner of resource not found');

		const resourceCreatedByWithUserInfo = [{ ...resourceCreatedBy, username: userResponse.username }];
		return {
			...resource,
			resourceCreatedBy: resourceCreatedByWithUserInfo,
		} satisfies ResourceWithUserInfo;
	}
}
