export interface EditResourcePorts {
	updateImage(input: UpdateImagePortInput): Promise<string>;
	updateResourceInfo(input: UpdateResourceInfoPortsInput): Promise<void>;
	updateResourcePublished(input: UpdateResourcePublishedPortsInput): Promise<void>;
	removeResourceFav(input: UpdateResourceFavPortsInput): Promise<void>;
	addResourceFav(input: UpdateResourceFavPortsInput): Promise<void>;
}

export type UpdateImagePortInput = {
	id: string;
	imageFile: File;
};

export type UpdateResourceInfoPortsInput = {
	resourceId: string;
	title: string;
	description: string;
	resourceUrl: string;
	imgUrl: string;
};

export type UpdateResourcePublishedPortsInput = {
	resourceId: string;
	published: boolean;
};

export type UpdateResourceFavPortsInput = {
	resourceId: string;
	userId: string;
};
