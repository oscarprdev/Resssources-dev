import { IMAGE_TYPE } from '@/services/bucket/bucket.client.types';

export type EditUserInfoInfraInput = {
	userId: string;
	email: string;
};

export type EditUserCredentialsInfraInput = {
	userId: string;
	password: string;
};

export type GetUserByUserIdInfraInput = {
	userId: string;
};

export type EditUserProfileInfraInput = {
	userId: string;
	description: string;
	profileImage: string;
};

export type UploadImageInfraInput = {
	id: string;
	image: Buffer;
	type: IMAGE_TYPE;
};

export type EditSocialLinksInfraInput = {
	userId: string;
	twitter: string;
	linkedin: string;
	github: string;
};
