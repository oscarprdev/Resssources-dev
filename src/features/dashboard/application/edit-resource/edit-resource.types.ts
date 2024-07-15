export type UpdateImageInput = {
	formData: FormData;
};

export type UpdateImageOutput = {
	imgUrl: string;
};

export type UpdateResourceInfoInput = {
	username: string;
	resourceId: string;
	title: string;
	description: string;
	resourceUrl: string;
	imgUrl: string;
};
