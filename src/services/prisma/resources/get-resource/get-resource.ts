import prisma from '../../db';
import { GetResourceByIdInput } from './types';

export const getResourceById = async ({ resourceId }: GetResourceByIdInput) => {
	return await prisma.resources.findUnique({
		where: {
			id: resourceId,
		},
	});
};
