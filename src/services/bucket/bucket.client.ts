import { BUCKET_ACCES_KEY, BUCKET_BASE_URL, BUCKET_KEY_ID, BUCKET_NAME, BUCKET_URL } from '@/constants';
import { UploadImageInput, UploadImageOutput } from './bucket.client.types';
import { Bucket } from '@oprdev/cloudflare-r2-storage';

export interface IBucketClient {
	uploadImage(input: UploadImageInput): Promise<UploadImageOutput>;
}

export class BucketClient implements IBucketClient {
	constructor() {}

	async uploadImage({ id, imageData, type }: UploadImageInput) {
		const bucket = new Bucket({
			endpoint: BUCKET_URL,
			accessKeyId: BUCKET_KEY_ID,
			secretAccessKey: BUCKET_ACCES_KEY,
			bucketName: BUCKET_NAME,
		});

		const uploadedImage = await bucket.uploadFile({
			file: imageData,
			id,
			contentType: type,
			project: BUCKET_NAME,
		});

		return {
			imgUrl: `${BUCKET_BASE_URL}/${uploadedImage}`,
		};
	}
}
