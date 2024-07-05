import prisma from '@/services/prisma/db';
import { CreateUserInput } from './types';

export const createUser = async ({ username, password, email, role }: CreateUserInput) => {
	return await prisma.user.create({
		data: {
			username,
			password,
			email,
			role,
		},
	});
};
