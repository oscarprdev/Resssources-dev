import { Users as UserStored } from '@prisma/client';

export interface EditResourcePorts {
	updateImage(input: UpdateImagePortInput): Promise<string>;
	getUserByUsername(input: GetUserByUsernameInput): Promise<UserStored | null>;
	updateResourceInfo(input: UpdateResourceInfoPortsInput): Promise<void>;
	updateResourcePublished(input: UpdateResourcePublishedPortsInput): Promise<void>;
}

export type UpdateImagePortInput = {
	id: string;
	imageFile: File;
};

export type GetUserByUsernameInput = {
	username: string;
};

export type UpdateResourceInfoPortsInput = {
	resourceId: string;
	title: string;
	description: string;
	resourceUrl: string;
	imgUrl: string;
};

export type UpdateResourcePublishedPortsInput = {
	resourceId: string;
	published: boolean;
};
