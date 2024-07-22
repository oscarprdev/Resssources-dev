export interface EditUserPorts {
	editInfo(input: EditUserInfoPortsInput): Promise<void>;
	editCredentials(input: EditUserCredentialsPortsInput): Promise<void>;

	getCurrentPasswordByUserId(
		input: GetCurrentPasswordByUserIdInput
	): Promise<GetCurrentPasswordByUserIdOutput | null>;
}

export type EditUserInfoPortsInput = {
	userId: string;
	email: string;
};

export type EditUserCredentialsPortsInput = {
	userId: string;
	password: string;
};

export type GetCurrentPasswordByUserIdInput = {
	userId: string;
};

export type GetCurrentPasswordByUserIdOutput = {
	password: string;
};
