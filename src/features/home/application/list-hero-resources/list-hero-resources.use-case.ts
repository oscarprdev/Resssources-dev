import { ListHeroResourcesOutput } from './list-hero-resources.types';
import { ListHeroResourcesPorts } from './list-hero-resources.ports';
import { Either, successResponse, errorResponse } from '@/lib/either';

interface IListHeroResourcesUsecase {
	listHeroResources(): Promise<Either<string, ListHeroResourcesOutput[]>>;
}

export class ListHeroResourcesUsecase implements IListHeroResourcesUsecase {
	constructor(private readonly ports: ListHeroResourcesPorts) {}

	async listHeroResources() {
		try {
			const response = await this.ports.listHeroResources();

			return successResponse(response);
		} catch (e: unknown) {
			return errorResponse(e instanceof Error ? e.message : 'Error listing hero resources');
		}
	}
}
