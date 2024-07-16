import {
	GetUserByIdInput,
	ListArrivalsResourcesInput,
	ListArrivalsResourcesPorts,
} from '../application/list-arrivals-resources/list-arrivals-resources.ports';
import { ListArrivalsResourcesInfra } from '../infrastructure/list-arrivals-resources/list-arrivals-resources.infra';
import { formatDistanceTime } from '@/lib/dates';

export class ListArrivalsResourcesAdapter implements ListArrivalsResourcesPorts {
	constructor(private readonly infra: ListArrivalsResourcesInfra) {}

	async listArrivalsResources({ published, limit }: ListArrivalsResourcesInput) {
		const resourcesInfra = await this.infra.listArrivalResources({ published, limit });

		return resourcesInfra.map((resource) => ({
			...resource,
			createdAt: formatDistanceTime(resource.createdAt),
			updatedAt: formatDistanceTime(resource.updatedAt),
		}));
	}

	async getUserById({ userId }: GetUserByIdInput) {
		return await this.infra.getUserById({ userId });
	}
}
