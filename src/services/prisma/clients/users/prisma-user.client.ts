import { Users as User } from '@prisma/client';
import {
	CreateUserInput,
	GetUserByCredentialsInput,
	GetUserByIdInput,
	GetUserByResourceCreatedInput,
	GetUserByUsernameInput,
	GetUsersListByResourceFavInput,
} from './prisma-user.client.types';
import prisma from '@/services/prisma/db';

export interface UserClient {
	getUserById(input: GetUserByIdInput): Promise<User | null>;
	getUserByResourceCreated(input: GetUserByResourceCreatedInput): Promise<User | null>;
	getUserByCredentials(input: GetUserByCredentialsInput): Promise<User | null>;
	getUserByUsername(input: GetUserByUsernameInput): Promise<User | null>;

	getUserListByResourceFav(input: GetUsersListByResourceFavInput): Promise<User[]>;

	createUser(input: CreateUserInput): Promise<User>;
}

export class PrismaUserClient implements UserClient {
	constructor() {}

	async getUserById({ userId }: GetUserByIdInput) {
		return prisma.users.findFirst({ where: { id: userId } });
	}

	async getUserByResourceCreated({ resourceId }: GetUserByResourceCreatedInput) {
		return await prisma.users.findFirst({
			where: {
				resourcesCreated: {
					some: {
						resourceId,
					},
				},
			},
		});
	}

	async getUserByCredentials({ username, password }: GetUserByCredentialsInput) {
		return await prisma.users.findUnique({
			where: {
				username,
				password,
			},
		});
	}

	async getUserByUsername({ username }: GetUserByUsernameInput) {
		return await prisma.users.findUnique({
			where: {
				username,
			},
		});
	}

	async getUserListByResourceFav({ resourceId }: GetUsersListByResourceFavInput) {
		return await prisma.users.findMany({
			where: {
				favouritesResources: {
					some: {
						resourceId,
					},
				},
			},
		});
	}

	async createUser({ username, password, email, role }: CreateUserInput) {
		return await prisma.users.create({
			data: {
				username,
				password,
				email,
				role,
			},
		});
	}
}
