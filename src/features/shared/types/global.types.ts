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

export const Kind = {
	FRONTEND: 'FRONTEND' as Kind,
	BACKEND: 'BACKEND' as Kind,
	UI: 'UI' as Kind,
	DATABASES: 'DATABASES' as Kind,
	STYLES: 'STYLES' as Kind,
	ALGORITHMS: 'ALGORITHMS' as Kind,
	ARCHITECTURE: 'ARCHITECTURE' as Kind,
	TOOLS: 'TOOLS' as Kind,
	FRAMEWORKS: 'FRAMEWORKS' as Kind,
	TESTING: 'TESTING' as Kind,
	DEVOPS: 'DEVOPS' as Kind,
	SECURITY: 'SECURITY' as Kind,
	AI: 'AI' as Kind,
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
