import { CreateResourcesPorts, GetUserByUsernameInput, StoreResourceInput } from '../application/create-resources.ports';
import { ICreateResourceInfra } from '../infrastructure/create-resource.infra';

export class CreateResourceAdapters implements CreateResourcesPorts {
	constructor(private readonly createResourcesInfra: ICreateResourceInfra) {}

	async getUserByUsername({ username }: GetUserByUsernameInput) {
		const user = await this.createResourcesInfra.getUserByUsername({ username });
		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}

	async storeResource({ resourceId, resourceUrl, title, description, faviconUrl, imgUrl, kinds, ownerId }: StoreResourceInput) {
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
