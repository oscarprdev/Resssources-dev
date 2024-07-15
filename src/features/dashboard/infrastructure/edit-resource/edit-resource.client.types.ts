import { IMAGE_TYPE } from '@/services/bucket/bucket.client.types';

export type UpdateImageClientInput = {
	id: string;
	imageData: Buffer;
	type: IMAGE_TYPE;
};

export type GetUserByUsernameClientInput = {
	username: string;
};

export type UpdateResourceClientInput = {
	resourceId: string;
	title: string;
	description: string;
	imgUrl: string;
	resourceUrl: string;
};
