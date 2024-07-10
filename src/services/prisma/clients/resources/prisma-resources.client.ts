import prisma from '@/services/prisma/db';
import {
	CreateResourceInput,
	GetResourceByIdInput,
	GetResourcesListByFavInput,
	GetResourcesListByKindInput,
	GetResourcesListByOwnerInput,
} from './prisma-resources.types';
import { Resources as Resource } from '@prisma/client';

export interface ResourcesClient {
	getResourceById(input: GetResourceByIdInput): Promise<Resource | null>;

	getResourcesList(): Promise<Resource[]>;
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

	async getResourcesList() {
		return await prisma.resources.findMany();
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

	async createResource({ title, description, faviconUrl, imgUrl, resourceUrl, kind, ownerId }: CreateResourceInput) {
		return await prisma.resources.create({
			data: {
				title,
				description,
				faviconUrl,
				imgUrl,
				resourceUrl,
				kind,
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
