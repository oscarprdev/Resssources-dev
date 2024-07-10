import { SCREENSHOT_TYPE } from '../puppeteer/puppeteer.client.types';

export type UploadImageInput = {
	id: string;
	imageData: Buffer;
	type: SCREENSHOT_TYPE;
};

export type UploadImageOutput = {
	imgUrl: string;
};
