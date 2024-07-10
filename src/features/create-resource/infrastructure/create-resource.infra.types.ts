import { SCREENSHOT_TYPE } from '@/services/puppeteer/puppeteer.client.types';
import { $Enums } from '@prisma/client';

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
