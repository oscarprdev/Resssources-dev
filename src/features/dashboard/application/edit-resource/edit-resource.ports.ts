import { Users as UserStored } from '@prisma/client';

export interface EditResourcePorts {
	updateImage(input: UpdateImagePortInput): Promise<string>;
	getUserByUsername(input: GetUserByUsernameInput): Promise<UserStored | null>;
}

export type UpdateImagePortInput = {
	id: string;
	imageFile: File;
};

export type GetUserByUsernameInput = {
	username: string;
};
