import { $Enums } from '@prisma/client';

export type LoginUserInput = {
	username: string;
	password: string;
};

export type LoginUserOutput = {
	username: string;
	role: $Enums.Role;
};

export type RegisterUserInput = {
	username: string;
	email: string;
	password: string;
};
