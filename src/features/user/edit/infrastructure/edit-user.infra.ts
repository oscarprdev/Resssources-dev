import {
	EditSocialLinksInfraInput,
	EditUserCredentialsInfraInput,
	EditUserInfoInfraInput,
	EditUserProfileInfraInput,
	GetUserByUserIdInfraInput,
	UploadImageInfraInput,
} from './edit-user.infra.types';
import { BucketClient } from '@/services/bucket/bucket.client';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { Users as User } from '@prisma/client';

export interface EditUserInfra {
	editInfo(input: EditUserInfoInfraInput): Promise<void>;
	editCredentials(input: EditUserCredentialsInfraInput): Promise<void>;
	editUserProfile(input: EditUserProfileInfraInput): Promise<void>;
	editSocialLinks(input: EditSocialLinksInfraInput): Promise<void>;

	uploadImage(input: UploadImageInfraInput): Promise<string>;

	getUserByUserId(input: GetUserByUserIdInfraInput): Promise<User | null>;
}

export class DefaultEditUserInfra implements EditUserInfra {
	constructor(
		private readonly userClient: UserClient,
		private readonly bucket: BucketClient
	) {}

	async editInfo({ userId, email }: EditUserInfoInfraInput) {
		await this.userClient.editInfo({ userId, email });
	}

	async editCredentials({ userId, password }: EditUserCredentialsInfraInput) {
		await this.userClient.editCredentials({ userId, password });
	}

	async editUserProfile({ userId, description, profileImage }: EditUserProfileInfraInput) {
		await this.userClient.editProfile({ userId, description, profileImage });
	}

	async editSocialLinks({ userId, twitter, linkedin, github }: EditSocialLinksInfraInput) {
		await this.userClient.editSocialLinks({ userId, twitter, linkedin, github });
	}

	async uploadImage({ id, image, type }: UploadImageInfraInput) {
		try {
			await this.bucket.removeImage({ id });
			const response = await this.bucket.uploadImage({ id, imageData: image, type });

			return response.imgUrl;
		} catch (error) {
			throw new Error('Error uploading image to bucket');
		}
	}

	async getUserByUserId({ userId }: GetUserByUserIdInfraInput): Promise<User | null> {
		return this.userClient.getUserById({ userId });
	}
}
