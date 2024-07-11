import prisma from '@/services/prisma/db';
import {
	CreateResourceInput,
	GetResourceByIdInput,
	GetResourceByTitleInput,
	GetResourceByUrlInput,
	GetResourcesListByFavInput,
	GetResourcesListByKindInput,
	GetResourcesListByOwnerInput,
	GetResourcesListInput,
} from './prisma-resources.types';
import { Resources as Resource } from '@prisma/client';

export interface ResourcesClient {
	getResourceById(input: GetResourceByIdInput): Promise<Resource | null>;
	getResourceByTitle(input: GetResourceByTitleInput): Promise<Resource | null>;
	getResourceByUrl(input: GetResourceByUrlInput): Promise<Resource | null>;

	getResourcesList(input: GetResourcesListInput): Promise<Resource[]>;
	getResourcesListByOwner(input: GetResourcesListByOwnerInput): Promise<Resource[]>;
	getResourcesListByFav(input: GetResourcesListByFavInput): Promise<Resource[]>;
	getResourcesListByKind(input: GetResourcesListByKindInput): Promise<Resource[]>;

	createResource(input: CreateResourceInput): Promise<Resource>;
}

export class PrismaResourcesClient implements ResourcesClient {
	constructor() {}

	async getResourceById({ resourceId }: GetResourceByIdInput) {
		return await prisma.resources.findUnique({
			where: {
				id: resourceId,
			},
		});
	}

	async getResourceByTitle({ title }: GetResourceByTitleInput) {
		return await prisma.resources.findUnique({
			where: {
				title,
			},
		});
	}

	async getResourceByUrl({ resourceUrl }: GetResourceByUrlInput) {
		return await prisma.resources.findUnique({
			where: {
				resourceUrl,
			},
		});
	}

	async getResourcesList({ cursor, pageSize, withUserData }: GetResourcesListInput) {
		if (!cursor || !pageSize) {
			return await prisma.resources.findMany({
				orderBy: {
					createdAt: 'asc',
				},
				include: {
					favouritedBy: withUserData,
					resourceCreatedBy: withUserData,
				},
			});
		}

		return await prisma.resources.findMany({
			take: pageSize,
			cursor: cursor ? { id: cursor } : undefined,
			include: {
				favouritedBy: true,
				resourceCreatedBy: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
	}

	async getResourcesListByOwner({ userId }: GetResourcesListByOwnerInput) {
		return prisma.resources.findMany({
			where: {
				resourceCreatedBy: {
					some: { userId },
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async getResourcesListByFav({ userId }: GetResourcesListByFavInput) {
		return await prisma.resources.findMany({
			where: {
				favouritedBy: {
					some: { userId },
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async getResourcesListByKind({ kind }: GetResourcesListByKindInput) {
		return await prisma.resources.findMany({
			where: {
				kind: {
					hasSome: kind,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async createResource({ resourceId, title, description, faviconUrl, imgUrl, resourceUrl, kinds, ownerId }: CreateResourceInput) {
		return await prisma.resources.create({
			data: {
				id: resourceId,
				title,
				description,
				faviconUrl,
				imgUrl,
				resourceUrl,
				kind: kinds,
				resourceCreatedBy: {
					create: {
						user: {
							connect: {
								id: ownerId,
							},
						},
					},
				},
			},
		});
	}
}
