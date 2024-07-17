import { IMAGE_TYPE } from '@/services/bucket/bucket.client.types';

import { EditResourceInfra } from '../infrastructure/edit-resource.client';
import {
	EditResourcePorts,
	UpdateImagePortInput,
	UpdateResourceFavPortsInput,
	UpdateResourceInfoPortsInput,
	UpdateResourcePublishedPortsInput,
} from '../application/edit-resource.ports';

export class EditResourceAdapter implements EditResourcePorts {
	constructor(private readonly infra: EditResourceInfra) {}

	async addResourceFav(input: UpdateResourceFavPortsInput): Promise<void> {
		await this.infra.addResourceFav(input);
	}

	async removeResourceFav(input: UpdateResourceFavPortsInput): Promise<void> {
		await this.infra.removeResourceFav(input);
	}

	async updateResourcePublished({ resourceId, published }: UpdateResourcePublishedPortsInput): Promise<void> {
		await this.infra.updateResourcePublished({ resourceId, published });
	}

	async updateResourceInfo({ resourceId, resourceUrl, title, description, imgUrl }: UpdateResourceInfoPortsInput): Promise<void> {
		await this.infra.updateResource({ resourceId, resourceUrl, title, description, imgUrl });
	}

	async updateImage({ id, imageFile }: UpdateImagePortInput) {
		const imageData = (await imageFile.arrayBuffer()) as Buffer;
		return await this.infra.updateImage({ id, imageData, type: imageFile.type as IMAGE_TYPE });
	}
}
