import {
	CreateResourceInput,
	GetResourceByIdInput,
	GetResourceByTitleInput,
	GetResourceByUrlInput,
	GetResourcesByOwnerCountInput,
	GetResourcesCountInput,
	GetResourcesFavCountInput,
	GetResourcesListByFavInput,
	GetResourcesListByKindInput,
	GetResourcesListByOwnerInput,
	GetResourcesListBySearchInput,
	GetResourcesListInput,
	RemoveResourceInput,
	ResourceWithRelations,
	UpdateResourceFavInput,
	UpdateResourceInput,
	UpdateResourceOwnerInput,
	UpdateResourcePublishedInput,
} from './prisma-resources.types';
import prisma from '@/services/prisma/db';
import { Resources as Resource } from '@prisma/client';

export interface ResourcesClient {
	getResourceById(input: GetResourceByIdInput): Promise<Resource | null>;
	getResourceByTitle(input: GetResourceByTitleInput): Promise<Resource | null>;
	getResourceByUrl(input: GetResourceByUrlInput): Promise<Resource | null>;

	getResourcesCount(input: GetResourcesCountInput): Promise<number>;
	getResourcesByOwnerCount(input: GetResourcesByOwnerCountInput): Promise<number>;
	getResourcesFavCount(input: GetResourcesFavCountInput): Promise<number>;

	getResourcesList(input: GetResourcesListInput): Promise<ResourceWithRelations[]>;
	getResourcesListByOwner(input: GetResourcesListByOwnerInput): Promise<Resource[]>;
	getResourcesListByFav(input: GetResourcesListByFavInput): Promise<ResourceWithRelations[]>;
	getResourcesListByKind(input: GetResourcesListByKindInput): Promise<Resource[]>;
	getResourcesListBySearch(input: GetResourcesListBySearchInput): Promise<Resource[]>;

	createResource(input: CreateResourceInput): Promise<Resource>;

	updateResource(input: UpdateResourceInput): Promise<Resource>;
	updateResourcePublished(input: UpdateResourcePublishedInput): Promise<Resource>;
	updateResourceOwner(input: UpdateResourceOwnerInput): Promise<void>;

	addResourceFav(input: UpdateResourceFavInput): Promise<void>;
	removeResourceFav(input: UpdateResourceFavInput): Promise<void>;

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

	async getResourcesCount({ userId, published, value, filters, pagination }: GetResourcesCountInput) {
		return await prisma.resources.count({
			where: {
				AND: [
					{
						OR: [
							{
								title: {
									contains: value,
									mode: 'insensitive',
								},
							},
							{
								description: {
									contains: value,
									mode: 'insensitive',
								},
							},
						],
					},
					{
						published,
					},
					{
						kind: {
							hasSome: filters.kinds,
						},
					},
					{
						resourceCreatedBy: {
							some: { userId },
						},
					},
				],
			},
			cursor: pagination && pagination.cursor ? { id: pagination.cursor } : undefined,
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async getResourcesByOwnerCount({ userId }: GetResourcesByOwnerCountInput) {
		return prisma.resources.count({
			where: {
				resourceCreatedBy: {
					some: { userId },
				},
			},
		});
	}

	async getResourcesFavCount({ userId }: GetResourcesFavCountInput) {
		return prisma.resources.count({
			where: {
				favouritedBy: {
					some: { userId },
				},
			},
		});
	}

	async getResourcesList({ userId, published, withUserData, pagination, filters }: GetResourcesListInput) {
		return await prisma.resources.findMany({
			skip: pagination && pagination.cursor ? 1 : 0,
			where: {
				AND: [
					{
						resourceCreatedBy: {
							some: userId ? { userId } : undefined,
						},
					},
					{
						published: published !== undefined ? published : undefined,
					},
					{
						kind: {
							hasSome: filters.kinds,
						},
					},
				],
			},
			take: (pagination && pagination.pageSize) || undefined,
			cursor: pagination && pagination.cursor ? { id: pagination.cursor } : undefined,
			include: {
				favouritedBy: withUserData,
				resourceCreatedBy: withUserData,
			},
			orderBy: {
				createdAt: 'desc',
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

	async getResourcesListByFav({ userId, published, withUserData, pagination, filters }: GetResourcesListByFavInput) {
		return await prisma.resources.findMany({
			skip: pagination && pagination.cursor ? 1 : 0,
			where: {
				AND: [
					{
						favouritedBy: {
							some: { userId },
						},
					},
					{
						published,
					},
					{
						kind: {
							hasSome: filters.kinds,
						},
					},
				],
			},
			take: pagination.pageSize,
			cursor: pagination && pagination.cursor ? { id: pagination.cursor } : undefined,
			include: {
				favouritedBy: withUserData,
				resourceCreatedBy: withUserData,
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

	async getResourcesListBySearch({ value, cursor, itemsPerRequest, kinds }: GetResourcesListBySearchInput) {
		console.log(value, cursor, itemsPerRequest, kinds);
		return await prisma.resources.findMany({
			skip: cursor ? 1 : 0,
			where: {
				AND: [
					{
						OR: [
							{
								title: {
									contains: value,
									mode: 'insensitive',
								},
							},
							{
								description: {
									contains: value,
									mode: 'insensitive',
								},
							},
						],
					},
					{
						published: true,
					},
					{
						kind: {
							hasSome: kinds,
						},
					},
				],
			},
			take: itemsPerRequest,
			cursor: cursor ? { id: cursor } : undefined,
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async createResource({
		resourceId,
		title,
		description,
		faviconUrl,
		imgUrl,
		resourceUrl,
		kinds,
		ownerId,
	}: CreateResourceInput) {
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

	async updateResourceOwner({ resourceId, oldOwnerId, newOwnerId }: UpdateResourceOwnerInput) {
		await prisma.resourcesCreated.update({
			where: {
				userId_resourceId: {
					userId: oldOwnerId,
					resourceId: resourceId,
				},
			},
			data: {
				userId: newOwnerId,
			},
		});
	}

	async addResourceFav({ resourceId, userId }: UpdateResourceFavInput) {
		await prisma.favouriteResource.create({
			data: {
				userId: userId,
				resourceId: resourceId,
			},
		});
	}

	async removeResourceFav({ resourceId, userId }: UpdateResourceFavInput) {
		await prisma.favouriteResource.delete({
			where: {
				userId_resourceId: {
					userId,
					resourceId,
				},
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
