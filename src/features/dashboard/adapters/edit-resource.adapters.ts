import { IMAGE_TYPE } from '@/services/bucket/bucket.client.types';
import {
	EditResourcePorts,
	GetUserByUsernameInput,
	UpdateImagePortInput,
	UpdateResourceInfoPortsInput,
	UpdateResourcePublishedPortsInput,
} from '../application/edit-resource/edit-resource.ports';
import { EditResourceClient } from '../infrastructure/edit-resource/edit-resource.client';

export class EditResourceAdapter implements EditResourcePorts {
	constructor(private readonly client: EditResourceClient) {}

	async updateResourcePublished({ resourceId, published }: UpdateResourcePublishedPortsInput): Promise<void> {
		await this.client.updateResourcePublished({ resourceId, published });
	}

	async updateResourceInfo({ resourceId, resourceUrl, title, description, imgUrl }: UpdateResourceInfoPortsInput): Promise<void> {
		await this.client.updateResource({ resourceId, resourceUrl, title, description, imgUrl });
	}

	async updateImage({ id, imageFile }: UpdateImagePortInput) {
		const imageData = (await imageFile.arrayBuffer()) as Buffer;
		return await this.client.updateImage({ id, imageData, type: imageFile.type as IMAGE_TYPE });
	}

	async getUserByUsername({ username }: GetUserByUsernameInput) {
		return await this.client.getUserByUsername({ username });
	}
}
