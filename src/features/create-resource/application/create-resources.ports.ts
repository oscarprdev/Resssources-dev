import { $Enums, Users as UserStored } from '@prisma/client';

export interface CreateResourcesPorts {
	getUserByUsername(input: GetUserByUsernameInput): Promise<UserStored>;
	storeResource(input: StoreResourceInput): Promise<void>;
}

export type GetUserByUsernameInput = {
	username: string;
};

export type GenerateResourceDataInput = {
	resourceUrl: string;
};

export type GenerateResourceDataOutput = {
	title: string;
	description: string;
	faviconUrl: string;
};

export type StoreResourceInput = {
	ownerId: string;
	resourceId: string;
	title: string;
	description: string;
	faviconUrl: string;
	imgUrl: string;
	resourceUrl: string;
	kinds: $Enums.Kind[];
};
