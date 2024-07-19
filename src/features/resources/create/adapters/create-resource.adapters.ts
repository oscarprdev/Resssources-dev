import {
	CreateResourcesPorts,
	GetResourceByTitleInput,
	GetUserByUsernameInput,
	StoreResourceInput,
} from '../application/create-resources.ports';
import { ICreateResourceInfra } from '../infrastructure/create-resource.infra';
import { GetResourceByUrlInput } from '../infrastructure/create-resource.infra.types';
import { ResourceStored } from '@/features/shared/types/global.types';

export class CreateResourceAdapters implements CreateResourcesPorts {
	constructor(private readonly createResourcesInfra: ICreateResourceInfra) {}

	async getUserByUsername({ username }: GetUserByUsernameInput) {
		return await this.createResourcesInfra.getUserByUsername({ username });
	}

	async getResourceByTitle({ title }: GetResourceByTitleInput): Promise<ResourceStored | null> {
		return this.createResourcesInfra.getResourceByTitle({ title });
	}

	async getResourceByUrl({ resourceUrl }: GetResourceByUrlInput): Promise<ResourceStored | null> {
		return this.createResourcesInfra.getResourceByUrl({ resourceUrl });
	}

	async storeResource({
		resourceId,
		resourceUrl,
		title,
		description,
		faviconUrl,
		imgUrl,
		kinds,
		ownerId,
	}: StoreResourceInput) {
		await this.createResourcesInfra.storeResource({
			resourceId,
			resourceUrl,
			title,
			description,
			faviconUrl,
			imgUrl,
			kinds,
			ownerId,
		});
	}
}
