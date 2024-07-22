import { EDIT_USER_ERRORS, EDIT_USERS_SUCCESS as EDIT_USER_SUCCESS } from './edit-user.dictionary';
import {
	EditUserCredentialsInput,
	EditUserInfoInput,
	editUserCredentialsInput,
	editUserInfoInput,
} from './edit-user.dto';
import { EditUserPorts } from './edit-user.ports';
import { UsecaseResponse } from '@/features/shared/features.types';
import { FeatureUsecase } from '@/features/shared/features.use-case';
import { successResponse } from '@/lib/either';

export interface EditUserUsecase {
	editInfo(input: EditUserInfoInput): UsecaseResponse<string>;
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

	async editCredentials(input: EditUserCredentialsInput) {
		try {
			const { userId, password } = editUserCredentialsInput.parse(input);

			await this.ports.editCredentials({ userId, password });

			return successResponse(EDIT_USER_SUCCESS.CREDENTIALS);
		} catch (error) {
			return this.errorUsecaseResponse(error, EDIT_USER_ERRORS.CREDENTIALS);
		}
	}
}
