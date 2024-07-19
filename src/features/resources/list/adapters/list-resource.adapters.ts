import { ResourceApplication } from '../../shared/resources.types';
import { GetUserByIdInput, IListResourcesPorts } from '../application/list-resources.ports';
import { ListResourcesInput, ResourceImage } from '../application/list-resources.use-case.types';
import { ListResourcesInfra } from '../infrastructure/list-resources.infra';
import { UserStored } from '@/features/shared/types/global.types';
import { formatDistanceTime } from '@/lib/dates';

export class ListResourcesAdapters implements IListResourcesPorts {
	constructor(private readonly infra: ListResourcesInfra) {}

	async listResourcesImages() {
		const infraResources = await this.infra.listResources({
			withUserData: false,
		});

		return infraResources.map(resources => ({
			id: resources.id,
			imgUrl: resources.imgUrl,
		})) satisfies ResourceImage[];
	}

	async listResources({ published, itemsPerRequest, cursor, withUserData, kinds }: ListResourcesInput) {
		const infraResources = await this.infra.listResources({
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

	async getUserById({ userId }: GetUserByIdInput): Promise<UserStored | null> {
		return await this.infra.getUserById({ userId });
	}
}
