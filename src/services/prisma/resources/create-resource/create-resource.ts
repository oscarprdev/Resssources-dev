import prisma from '@/services/prisma/db';
import { CreateResourceInput } from './types';

export const createResource = async ({ title, description, faviconUrl, imgUrl, resourceUrl, kind, ownerId }: CreateResourceInput) => {
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
};
