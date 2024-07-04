import prisma from '../../db';
import { GetUserByCredentialsInput, GetUserByIdInput, GetUserByResourceCreatedInput } from './types';

export const getUserById = async ({ userId }: GetUserByIdInput) => {
	return prisma.user.findUnique({ where: { id: userId } });
};

export const getUserByResourceCreated = async ({ resourceId }: GetUserByResourceCreatedInput) => {
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

export const getUserByCredentials = async ({ username, password }: GetUserByCredentialsInput) => {
	return await prisma.user.findUnique({
		where: {
			username,
			password,
		},
	});
};
