import { RESOURCES_ERRORS } from '../../shared/resources.constants';
import { ResourceApplication, ResourceWithUserInfo } from '../../shared/resources.types';
import { IListResourcesPorts } from './list-resources.ports';
import {
	ListResourcesBySearchInput,
	ListResourcesBySearchOutput,
	ListResourcesInput,
	ListResourcesOutput,
	ResourceImage,
} from './list-resources.use-case.types';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { UsecaseResponse } from '@/features/shared/features.types';
import { FeatureUsecase } from '@/features/shared/features.use-case';
import { successResponse } from '@/lib/either';

export interface IListResourcesUsecase {
	listResourcesImages(): UsecaseResponse<ResourceImage[]>;
	listResources(input: ListResourcesInput): UsecaseResponse<ListResourcesOutput>;
	listResourcesBySearch(input: ListResourcesBySearchInput): UsecaseResponse<ListResourcesBySearchOutput>;
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

	async listResources({ userId, published, itemsPerRequest, cursor, kinds, withUserData }: ListResourcesInput) {
		try {
			const [resources, count] = await Promise.all([
				this.ports.listResources({
					published,
					itemsPerRequest,
					cursor,
					userId,
					withUserData,
					kinds: kinds || RESOURCE_KIND_VALUES,
				}),
				this.ports.getResourcesCount({
					published,
					userId,
					cursor,
					kinds: kinds || RESOURCE_KIND_VALUES,
				}),
			]);

			let items: ResourceWithUserInfo[] | ResourceApplication[] = resources;

			if (withUserData) {
				items = await Promise.all(resources.map(resource => this.addUserInfoToResource(resource)));
			}

			return successResponse({
				items,
				moreItems: itemsPerRequest ? count - 1 > itemsPerRequest : false,
				cursor: resources.length > 0 ? resources[resources.length - 1].id : undefined,
			});
		} catch (error) {
			return this.errorUsecaseResponse(error, RESOURCES_ERRORS.LISTING);
		}
	}

	async listResourcesBySearch({ cursor, value, kinds }: ListResourcesBySearchInput) {
		try {
			const resources = await this.ports.listResourcesBySearch({ cursor, value, kinds, itemsPerRequest: 8 });

			return successResponse(resources);
		} catch (error) {
			return this.errorUsecaseResponse(error, RESOURCES_ERRORS.SEARCH);
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
