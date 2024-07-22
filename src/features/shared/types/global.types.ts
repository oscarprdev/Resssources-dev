import { $Enums, SocialMedia as PrismaSocialMedia, Resources as Resource, Users as User } from '@prisma/client';

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
