import { $Enums } from '@prisma/client';

export type CreateUserInput = {
	username: string;
	password: string;
	email: string;
	role: $Enums.Role;
};
