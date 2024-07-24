import { IMAGE_TYPE } from '@/services/bucket/bucket.client.types';

export interface EditUserPorts {
	editInfo(input: EditUserInfoPortsInput): Promise<void>;
	editCredentials(input: EditUserCredentialsPortsInput): Promise<void>;
	editUserProfile(input: EditUseProfilePortsInput): Promise<void>;
	editUserSocial(input: EditUserSocialPortsInput): Promise<void>;

	uploadImage(input: UploadImagePortsInput): Promise<string>;

	getCurrentPasswordByUserId(
		input: GetCurrentPasswordByUserIdPortsInput
	): Promise<GetCurrentPasswordByUserIdPortsOutput | null>;
}

export type EditUserInfoPortsInput = {
	userId: string;
	email: string;
};

export type EditUserCredentialsPortsInput = {
	userId: string;
	password: string;
};

export type GetCurrentPasswordByUserIdPortsInput = {
	userId: string;
};

export type GetCurrentPasswordByUserIdPortsOutput = {
	password: string;
};

export type UploadImagePortsInput = {
	id: string;
	image: Buffer;
	type: IMAGE_TYPE;
};

export type EditUseProfilePortsInput = {
	userId: string;
	imgUrl: string;
	description: string;
};

export type EditUserSocialPortsInput = {
	userId: string;
	twitter: string;
	linkedin: string;
	github: string;
};
