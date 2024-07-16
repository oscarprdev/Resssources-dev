import { Kinds } from '@/features/shared/types/global.types';

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
	kinds: Kinds;
};
