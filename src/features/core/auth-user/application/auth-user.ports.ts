import { $Enums } from '@prisma/client';

export interface AuthUserPorts {
	getUserByCredentials(input: GetUserByCredentialsInput): Promise<GetUserByCredentialsOutput | null>;
	getUserByUsername(input: GetUserByUsernameInput): Promise<GetUserByUsernameOutput | null>;
	createUser(input: CreateUserInput): Promise<CreateUserOutput>;
}

export type GetUserByCredentialsInput = {
	username: string;
	password: string;
};

export type GetUserByCredentialsOutput = {
	username: string;
	password: string;
	email: string;
};

export type GetUserByUsernameInput = {
	username: string;
};

export type GetUserByUsernameOutput = {
	username: string;
	password: string;
	id: string;
	role: $Enums.Role;
};

export type CreateUserInput = {
	username: string;
	password: string;
	email: string;
	role: $Enums.Role;
};

export type CreateUserOutput = {
	id: string;
};
