import {
	CreateUserInput,
	EditUserCredentialsClientInput as EditCredentialsClientInput,
	EditUserInfoClientInput as EditInfoClientInput,
	EditProfileClientInput,
	EditSocialLinksClientInput,
	GetUserByCredentialsInput,
	GetUserByIdInput,
	GetUserByResourceCreatedInput,
	GetUserByUsernameInput,
	GetUserSocialMediaClientInput,
	GetUsersListByResourceFavInput,
	RemoveUserClientInput,
} from './prisma-user.client.types';
import prisma from '@/services/prisma/db';
import { $Enums, SocialMedia, Users as User } from '@prisma/client';

export interface UserClient {
	getUserById(input: GetUserByIdInput): Promise<User | null>;
	getUserByResourceCreated(input: GetUserByResourceCreatedInput): Promise<User | null>;
	getUserByCredentials(input: GetUserByCredentialsInput): Promise<User | null>;
	getUserByUsername(input: GetUserByUsernameInput): Promise<User | null>;

	getUserAdmin(): Promise<User | null>;

	getUserSocialMedia(input: GetUserSocialMediaClientInput): Promise<SocialMedia | null>;

	getUserListByResourceFav(input: GetUsersListByResourceFavInput): Promise<User[]>;

	createUser(input: CreateUserInput): Promise<User>;

	editInfo(input: EditInfoClientInput): Promise<User>;
	editProfile(input: EditProfileClientInput): Promise<User>;
	editCredentials(input: EditCredentialsClientInput): Promise<User>;
	editSocialLinks(input: EditSocialLinksClientInput): Promise<SocialMedia>;

	removeUser(input: RemoveUserClientInput): Promise<void>;
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

	async getUserSocialMedia({ userId }: GetUserSocialMediaClientInput) {
		return await prisma.socialMedia.findUnique({
			where: {
				userId,
			},
		});
	}

	async getUserAdmin() {
		return await prisma.users.findFirst({
			where: {
				role: $Enums.Role.ADMIN,
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

	async editInfo({ userId, email }: EditInfoClientInput) {
		return await prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				email,
			},
		});
	}

	async editProfile({ userId, description, profileImage }: EditProfileClientInput) {
		return await prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				description,
				profileImage,
			},
		});
	}

	async editSocialLinks({ userId, twitter, linkedin, github }: EditSocialLinksClientInput) {
		return await prisma.socialMedia.update({
			where: {
				userId,
			},
			data: {
				twitter,
				linkedin,
				github,
			},
		});
	}

	async editCredentials({ userId, password }: EditCredentialsClientInput) {
		return await prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				password,
			},
		});
	}

	async removeUser({ userId }: RemoveUserClientInput) {
		await prisma.users.delete({
			where: {
				id: userId,
			},
		});
	}
}
