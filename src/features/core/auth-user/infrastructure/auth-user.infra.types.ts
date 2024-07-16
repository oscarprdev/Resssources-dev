import { $Enums } from '@prisma/client';

export type GetUserByUsername = {
	username: string;
};

export type GetUserByCredentialsInfraInput = {
	username: string;
	password: string;
};

export type CreateUserInfraInput = {
	username: string;
	email: string;
	password: string;
	role: $Enums.Role;
};
