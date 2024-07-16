import { UserStored } from '@/features/shared/types/global.types';
import { ResourceApplication } from '../../shared/resources.types';
import { GetUserByIdInput, IListResourcesPorts } from '../application/list-resources.ports';
import { ListResourcesInput, ResourceImage } from '../application/list-resources.use-case.types';
import { ListResourcesInfra } from '../infrastructure/list-resources.infra';
import { formatDistanceTime } from '@/lib/dates';

export class ListResourcesAdapters implements IListResourcesPorts {
	constructor(private readonly infra: ListResourcesInfra) {}

	async listResourcesImages() {
		const infraResources = await this.infra.listResources({ withUserData: false });

		return infraResources.map((resources) => ({
			id: resources.id,
			imgUrl: resources.imgUrl,
		})) satisfies ResourceImage[];
	}

	async listResources({ published, itemsPerRequest, cursor, withUserData }: ListResourcesInput): Promise<ResourceApplication[]> {
		const resourcesInfra = await this.infra.listResources({ published, itemsPerRequest, cursor, withUserData });

		return resourcesInfra.map((resource) => ({
			...resource,
			createdAt: formatDistanceTime(resource.createdAt),
			updatedAt: formatDistanceTime(resource.updatedAt),
		}));
	}

	async getUserById({ userId }: GetUserByIdInput): Promise<UserStored | null> {
		return await this.infra.getUserById({ userId });
	}
}
