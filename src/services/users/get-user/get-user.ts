import prisma from '../../db';
import { GetUserByIdInput, GetUserByResourceCreatedInput } from './types';

export const getUserById = async ({ userId }: GetUserByIdInput) => {
	return prisma.user.findUnique({ where: { id: userId } });
};

export const GetUserByResourceCreated = async ({ resourceId }: GetUserByResourceCreatedInput) => {
	return await prisma.user.findFirst({
		where: {
			resourcesCreated: {
				some: {
					resourceId,
				},
			},
		},
	});
};
