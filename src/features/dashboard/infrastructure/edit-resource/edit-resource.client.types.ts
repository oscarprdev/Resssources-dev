import { IMAGE_TYPE } from '@/services/bucket/bucket.client.types';

export type UpdateImageClientInput = {
	id: string;
	imageData: Buffer;
	type: IMAGE_TYPE;
};

export type GetUserByUsernameClientInput = {
	username: string;
};
