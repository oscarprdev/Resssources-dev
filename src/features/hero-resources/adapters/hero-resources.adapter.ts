import { HeroResourcesPorts } from '../application/hero-resources.ports';
import { GetHeroResourcesOutput } from '../application/hero-resources.types';
import { IHeroResourcesInfra } from '../infrastructure/hero-resources.infra';

export class HeroResourcesAdapter implements HeroResourcesPorts {
	constructor(private readonly infra: IHeroResourcesInfra) {}

	async getResourcesData(): Promise<GetHeroResourcesOutput[]> {
		const infraResources = await this.infra.list();

		return infraResources.map((resources) => ({
			resourceId: resources.id,
			title: resources.title,
			imgUrl: resources.imgUrl,
		}));
	}
}
