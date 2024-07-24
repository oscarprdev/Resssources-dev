import { EDIT_USER_ERRORS, EDIT_USERS_SUCCESS as EDIT_USER_SUCCESS } from './edit-user.dictionary';
import {
	EditUserCredentialsInput,
	EditUserInfoInput,
	EditUserProfileInput,
	editUserCredentialsInput,
	editUserInfoInput,
	editUserProfileInput,
} from './edit-user.dto';
import { EditUserPorts } from './edit-user.ports';
import { SALT } from '@/constants';
import { UsecaseResponse } from '@/features/shared/features.types';
import { FeatureUsecase } from '@/features/shared/features.use-case';
import { successResponse } from '@/lib/either';
import { IMAGE_TYPE } from '@/services/bucket/bucket.client.types';
import bcrypt from 'bcryptjs';

export interface EditUserUsecase {
	editInfo(input: EditUserInfoInput): UsecaseResponse<string>;
	editProfile(input: EditUserProfileInput): UsecaseResponse<string>;
	editCredentials(input: EditUserCredentialsInput): UsecaseResponse<string>;
}

export class DefaultEditUserUsecase extends FeatureUsecase implements EditUserUsecase {
	constructor(private readonly ports: EditUserPorts) {
		super();
	}

	async editInfo(input: EditUserInfoInput) {
		try {
			const { userId, email } = editUserInfoInput.parse(input);

			await this.ports.editInfo({ userId, email });

			return successResponse(EDIT_USER_SUCCESS.INFO);
		} catch (error) {
			return this.errorUsecaseResponse(error, EDIT_USER_ERRORS.INFO);
		}
	}

	async editProfile(input: EditUserProfileInput) {
		try {
			const { userId, username, description, image } = editUserProfileInput.parse(input);

			const imgUrl = await this.uploadImage(username, image);
			await this.ports.editUserProfile({ userId, description, imgUrl });

			return successResponse(EDIT_USER_SUCCESS.PROFILE);
		} catch (error) {
			return this.errorUsecaseResponse(error, EDIT_USER_ERRORS.PROFILE);
		}
	}

	async editCredentials(input: EditUserCredentialsInput) {
		try {
			const { userId, password, oldPassword } = editUserCredentialsInput.parse(input);

			const currentPasswordResponse = await this.ports.getCurrentPasswordByUserId({ userId });
			if (!currentPasswordResponse) throw new Error(EDIT_USER_ERRORS.PASSWORD_NOT_FOUND);

			const isCurrentPasswordValid = await bcrypt.compare(oldPassword, currentPasswordResponse.password);
			if (!isCurrentPasswordValid) throw new Error(EDIT_USER_ERRORS.PASSWORD_NOT_VALID);

			const isSamePassword = await bcrypt.compare(password, currentPasswordResponse.password);
			if (isSamePassword) throw new Error(EDIT_USER_ERRORS.PASSWORD_IS_EQUAL);

			const passwordCrypted = await bcrypt.hash(password, SALT);

			await this.ports.editCredentials({ userId, password: passwordCrypted });

			return successResponse(EDIT_USER_SUCCESS.CREDENTIALS);
		} catch (error) {
			return this.errorUsecaseResponse(error, EDIT_USER_ERRORS.CREDENTIALS);
		}
	}

	private async uploadImage(username: string, image: File) {
		const imageId = `${username}/profile-image-${crypto.randomUUID().toString()}`;
		const buffer = (await image.arrayBuffer()) as Buffer;

		return await this.ports.uploadImage({ id: imageId, image: buffer, type: image.type as IMAGE_TYPE });
	}
}
