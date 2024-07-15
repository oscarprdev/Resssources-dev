export enum IMAGE_TYPE {
	png = 'png',
	jpeg = 'jpeg',
	webp = 'webp',
}

export type UploadImageInput = {
	id: string;
	imageData: Buffer;
	type: IMAGE_TYPE;
};

export type UploadImageOutput = {
	imgUrl: string;
};
