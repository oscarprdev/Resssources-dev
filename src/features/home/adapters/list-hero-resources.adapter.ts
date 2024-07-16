import { ListHeroResourcesPorts } from '../application/list-hero-resources/list-hero-resources.ports';
import { ListHeroResourcesOutput } from '../application/list-hero-resources/list-hero-resources.types';
import { IListHeroResourcesInfra } from '../infrastructure/list-hero-resources/list-hero-resources.infra';

export class ListHeroResourcesAdapter implements ListHeroResourcesPorts {
	constructor(private readonly infra: IListHeroResourcesInfra) {}

	async listHeroResources(): Promise<ListHeroResourcesOutput[]> {
		const infraResources = await this.infra.list();

		return infraResources.map((resources) => ({
			resourceId: resources.id,
			title: resources.title,
			imgUrl: resources.imgUrl,
		}));
	}
}
