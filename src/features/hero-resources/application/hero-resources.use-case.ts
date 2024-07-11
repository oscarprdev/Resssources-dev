import { GetHeroResourcesOutput } from './hero-resources.types';
import { HeroResourcesPorts } from './hero-resources.ports';
import { Either, successResponse, errorResponse } from '@/lib/either';

interface IHeroResourcesUsecase {
	getHeroResources(): Promise<Either<string, GetHeroResourcesOutput[]>>;
}

export class HeroResourcesUsecase implements IHeroResourcesUsecase {
	constructor(private readonly ports: HeroResourcesPorts) {}

	async getHeroResources() {
		try {
			const response = await this.ports.getResourcesData();

			return successResponse(response);
		} catch (e: unknown) {
			return errorResponse(e instanceof Error ? e.message : 'Error listing hero resources');
		}
	}
}
