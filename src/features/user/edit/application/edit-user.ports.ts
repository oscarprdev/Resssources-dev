export interface EditUserPorts {
	editInfo(input: EditUserInfoPortsInput): Promise<void>;
	editCredentials(input: EditUserCredentialsPortsInput): Promise<void>;
}

export type EditUserInfoPortsInput = {
	userId: string;
	email: string;
};

export type EditUserCredentialsPortsInput = {
	userId: string;
	password: string;
};
