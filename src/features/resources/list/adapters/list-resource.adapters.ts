import { Kinds, ResourceApplication } from '../../shared/resources.types';
import { GetUserByIdPortsInput, IListResourcesPorts } from '../application/list-resources.ports';
import {
	GetResourcesCountInput,
	ListResourcesImagesInput,
	ListResourcesInput,
	ResourceImage,
} from '../application/list-resources.use-case.types';
import { ListResourcesInfra } from '../infrastructure/list-resources.infra';
import { UserStored } from '@/features/shared/types/global.types';
import { formatDistanceTime } from '@/lib/dates';

export class ListResourcesAdapters implements IListResourcesPorts {
	constructor(private readonly infra: ListResourcesInfra) {}

	async getResourcesCount({ published, cursor, kinds }: GetResourcesCountInput): Promise<number> {
		return await this.infra.getResourcesCount({ published, pagination: { cursor }, filters: { kinds } });
	}

	async listResourcesImages({ kinds }: ListResourcesImagesInput) {
		const infraResources = await this.infra.listResources({
			withUserData: false,
			published: true,
			kinds,
		});

		return infraResources.map(resources => ({
			id: resources.id,
			imgUrl: resources.imgUrl,
		})) satisfies ResourceImage[];
	}

	async listResources({ userId, published, itemsPerRequest, cursor, withUserData, kinds }: ListResourcesInput) {
		const infraResources = await this.infra.listResources({
			userId,
			published,
			itemsPerRequest,
			cursor,
			withUserData,
			kinds,
		});

		return infraResources.map(resource => ({
			...resource,
			createdAt: formatDistanceTime(resource.createdAt),
			updatedAt: formatDistanceTime(resource.updatedAt),
		}));
	}

	async getUserById({ userId }: GetUserByIdPortsInput): Promise<UserStored | null> {
		return await this.infra.getUserById({ userId });
	}
}
