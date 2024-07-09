import { Either } from '@/lib/either';
import { $Enums, Users as UserStored } from '@prisma/client';

export interface CreateResourcesPorts {
	getUserByUsername(input: GetUserByUsernameInput): Promise<Either<string, UserStored>>;
	generateResourceData(input: GenerateResourceDataInput): Promise<Either<string, GenerateResourceDataOutput>>;
	takeScreenshot(input: TakeScreenshotInput): Promise<Either<string, TakeScreenshotOutput>>;
	storeResourceImageInBucket(input: StoreResourceImageInput): Promise<Either<string, StoreResourceImageOutput>>;
	storeResource(input: StoreResourceInput): Promise<Either<string, string>>;
}

export type GetUserByUsernameInput = {
	username: string;
};

export type GenerateResourceDataInput = {
	resourceUrl: string;
};

export type GenerateResourceDataOutput = {
	title: string;
	description: string;
	faviconUrl: string;
};

export type TakeScreenshotInput = {
	resourceUrl: string;
};

export type TakeScreenshotOutput = {
	imageData: Buffer;
};

export type StoreResourceImageInput = {
	imageData: Buffer;
};

export type StoreResourceImageOutput = {
	resourceId: string;
	imgUrl: string;
};

export type StoreResourceInput = {
	ownerId: string;
	resourceId: string;
	title: string;
	description: string;
	faviconUrl: string;
	imgUrl: string;
	resourceUrl: string;
	kind: $Enums.Kind;
};
