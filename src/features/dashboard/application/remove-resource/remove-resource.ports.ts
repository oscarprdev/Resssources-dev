export interface RemoveResourcePorts {
	removeResource(input: RemoveResourcePortsInput): Promise<void>;
}

export type RemoveResourcePortsInput = {
	resourceId: string;
};
