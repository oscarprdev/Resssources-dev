import { RemoveImageInput, UploadImageInput, UploadImageOutput } from './bucket.client.types';
import { BUCKET_ACCES_KEY, BUCKET_BASE_URL, BUCKET_KEY_ID, BUCKET_NAME, BUCKET_URL } from '@/constants';
import { Bucket } from '@oprdev/cloudflare-r2-storage';

export interface IBucketClient {
	uploadImage(input: UploadImageInput): Promise<UploadImageOutput>;
	removeImage(input: RemoveImageInput): Promise<void>;
}

export class BucketClient implements IBucketClient {
	private readonly bucket: Bucket;

	constructor() {
		this.bucket = new Bucket({
			endpoint: BUCKET_URL,
			accessKeyId: BUCKET_KEY_ID,
			secretAccessKey: BUCKET_ACCES_KEY,
			bucketName: BUCKET_NAME,
		});
	}

	async uploadImage({ id, imageData, type }: UploadImageInput) {
		const uploadedImage = await this.bucket.uploadFile({
			file: imageData,
			id,
			contentType: type,
			project: BUCKET_NAME,
		});

		return {
			imgUrl: `${BUCKET_BASE_URL}/${uploadedImage}`,
		};
	}

	async removeImage({ id }: RemoveImageInput): Promise<void> {
		await this.bucket.deleteItemByKey({ key: id });
	}
}
