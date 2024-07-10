export enum SCREENSHOT_TYPE {
	png = 'png',
	jpeg = 'jpeg',
	webp = 'webp',
}

export type TakeScreenshotInput = {
	url: string;
	type: SCREENSHOT_TYPE;
};

export type TakeScreenshotOutput = {
	screenshot: Buffer;
};
