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
	RemoveResourceInput,
	ResourceWithRelations,
	UpdateResourceFavInput,
	UpdateResourceInput,
	UpdateResourcePublishedInput,
} from './prisma-resources.types';
import { Resources as Resource } from '@prisma/client';

export interface ResourcesClient {
	getResourceById(input: GetResourceByIdInput): Promise<Resource | null>;
	getResourceByTitle(input: GetResourceByTitleInput): Promise<Resource | null>;
	getResourceByUrl(input: GetResourceByUrlInput): Promise<Resource | null>;

	getResourcesList(input: GetResourcesListInput): Promise<ResourceWithRelations[]>;
	getResourcesListByOwner(input: GetResourcesListByOwnerInput): Promise<Resource[]>;
	getResourcesListByFav(input: GetResourcesListByFavInput): Promise<Resource[]>;
	getResourcesListByKind(input: GetResourcesListByKindInput): Promise<Resource[]>;

	createResource(input: CreateResourceInput): Promise<Resource>;

	updateResource(input: UpdateResourceInput): Promise<Resource>;
	updateResourcePublished(input: UpdateResourcePublishedInput): Promise<Resource>;

	removeResource(input: RemoveResourceInput): Promise<void>;
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

	async getResourcesList({ published, withUserData, pagination }: GetResourcesListInput) {
		return await prisma.resources.findMany({
			where: {
				published: published || undefined,
			},
			take: pagination?.pageSize || undefined,
			cursor: pagination?.cursor ? { id: pagination.cursor } : undefined,
			include: {
				favouritedBy: withUserData,
				resourceCreatedBy: withUserData,
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

	async updateResource({ resourceId, title, description, imgUrl, resourceUrl }: UpdateResourceInput) {
		return await prisma.resources.update({
			where: { id: resourceId },
			data: {
				title,
				description,
				imgUrl,
				resourceUrl,
			},
		});
	}

	async updateResourcePublished({ resourceId, published }: UpdateResourcePublishedInput) {
		return await prisma.resources.update({
			where: { id: resourceId },
			data: {
				published,
			},
		});
	}

	async updateResourceFav({ resourceId, userId }: UpdateResourceFavInput) {
		return await prisma.favouriteResource.create({
			data: {
				userId: userId,
				resourceId: resourceId,
			},
		});
	}

	async removeResource({ resourceId }: RemoveResourceInput): Promise<void> {
		await prisma.resources.delete({
			where: {
				id: resourceId,
			},
		});
	}
}
