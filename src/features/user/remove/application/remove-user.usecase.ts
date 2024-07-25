import { REMOVE_USER_ERRORS, SUCCESS_REMOVE_USER } from './remove-user.dictionary';
import { RemoveUserInputDto, removeUserInputDto } from './remove-user.dtos';
import { RemoveUserPorts } from './remove-user.ports';
import { UsecaseResponse } from '@/features/shared/features.types';
import { FeatureUsecase } from '@/features/shared/features.use-case';
import { ResourceStored } from '@/features/shared/types/global.types';
import { successResponse } from '@/lib/either';

export interface RemoveUserUsecase {
	removeUser(input: RemoveUserInputDto): UsecaseResponse<string>;
}

export class DefaultRemoveUserUsecase extends FeatureUsecase implements RemoveUserUsecase {
	constructor(private readonly ports: RemoveUserPorts) {
		super();
	}

	async removeUser(input: RemoveUserInputDto) {
		try {
			const { userId } = removeUserInputDto.parse(input);

			const userAdminId = await this.ports.getUserAdminId();
			if (!userAdminId) throw new Error(REMOVE_USER_ERRORS.USER_ADMIN_NOT_FOUND);

			const resources = await this.ports.getUserResourcesById({ userId });
			if (Array.isArray(resources) && resources.length > 0) {
				await this.editResourcesOwner(resources, userAdminId, userId);
			}

			await this.ports.removeUser({ userId });

			return successResponse(SUCCESS_REMOVE_USER.DELETING);
		} catch (error) {
			return this.errorUsecaseResponse(error, REMOVE_USER_ERRORS.DELETING);
		}
	}

	private async editResourcesOwner(resources: ResourceStored[], newOwnerId: string, oldOwnerId: string) {
		try {
			await Promise.all(
				resources.map(resource =>
					this.ports.editResourceOwner({ resourceId: resource.id, newOwnerId, oldOwnerId })
				)
			);
		} catch (error) {
			throw new Error(REMOVE_USER_ERRORS.EDITTING_OWNER);
		}
	}
}
