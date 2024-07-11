import { $Enums, Users as UserStored, Resources as ResourceStored } from '@prisma/client';

export interface CreateResourcesPorts {
	getUserByUsername(input: GetUserByUsernameInput): Promise<UserStored | null>;

	getResourceByTitle(input: GetResourceByTitleInput): Promise<ResourceStored | null>;
	getResourceByUrl(input: GetResourceByUrlInput): Promise<ResourceStored | null>;

	storeResource(input: StoreResourceInput): Promise<void>;
}

export type GetUserByUsernameInput = {
	username: string;
};

export type GetResourceByTitleInput = {
	title: string;
};

export type GetResourceByUrlInput = {
	resourceUrl: string;
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
