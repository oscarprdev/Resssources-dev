import { $Enums, SocialMedia as PrismaSocialMedia, Resources as Resource, Users as User } from '@prisma/client';

export type Kind = $Enums.Kind;
export type Kinds = $Enums.Kind[];
export type ResourceStored = Resource;
export type UserStored = User;
export type SocialMedia = PrismaSocialMedia;

export type ResourceApplication = {
	id: string;
	title: string;
	description: string;
	imgUrl: string;
	faviconUrl: string;
	resourceUrl: string;
	createdAt: string;
	updatedAt: string;
	published: boolean;
	kind: Kinds;
	favouritedBy: Object[];
	resourceCreatedBy: {
		userId: string;
		resourceId: string;
		createdAt: Date;
	}[];
};

export interface ResourceWithUserInfo extends ResourceApplication {
	resourceCreatedBy: {
		userId: string;
		resourceId: string;
		createdAt: Date;
		username: string;
	}[];
}

export const Kind: { [key in Kind]: key } = {
	FRONTEND: 'FRONTEND',
	BACKEND: 'BACKEND',
	UI: 'UI',
	DATABASES: 'DATABASES',
	STYLES: 'STYLES',
	ALGORITHMS: 'ALGORITHMS',
	ARCHITECTURE: 'ARCHITECTURE',
	TOOLS: 'TOOLS',
	FRAMEWORKS: 'FRAMEWORKS',
	TESTING: 'TESTING',
	DEVOPS: 'DEVOPS',
	SECURITY: 'SECURITY',
	AI: 'AI',
};

export type ResourceSearched = {
	id: string;
	faviconUrl: string;
	title: string;
	description: string;
	url: string;
};

export type ResourceType = 'shared' | 'favourites';
export const ResourceType = {
	SHARED: 'shared' as ResourceType,
	FAVOURITES: 'favourites' as ResourceType,
};
