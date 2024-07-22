import { $Enums } from '@prisma/client';

export type CreateUserInput = {
	username: string;
	password: string;
	email: string;
	role: $Enums.Role;
};

export type GetUserByIdInput = { userId: string };

export type GetUserByUsernameInput = { username: string };

export type GetUserByResourceCreatedInput = {
	resourceId: string;
};

export type GetUserByCredentialsInput = {
	username: string;
	password: string;
};

export type GetUsersListByResourceFavInput = {
	resourceId: string;
};

export type EditUserInfoClientInput = {
	userId: string;
	email: string;
};

export type EditUserCredentialsClientInput = {
	userId: string;
	password: string;
};
