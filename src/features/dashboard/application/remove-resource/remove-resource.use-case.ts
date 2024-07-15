import { RemoveResourceInput } from './remove-resource.types';
import { removeResourceInputSchema } from './remove-resource.schemas';
import { REMOVE_RESOURCE_USECASE_ERRORS, REMOVE_RESOURCE_USECASE_SUCCESS } from './remove-resource.constants';
import { Either, errorResponse, successResponse } from '@/lib/either';
import { RemoveResourcePorts } from './remove-resource.ports';
import { AuthorizedUsecase } from '@/features/shared/authorizedUsecase';
import { UserClient } from '@/services/prisma/clients/users/prisma-user.client';

export interface IRemoveResourceUsecas {
	removeResource(input: RemoveResourceInput): Promise<Either<string, string>>;
}

export class RemoveResourceUsecase extends AuthorizedUsecase implements IRemoveResourceUsecas {
	constructor(private readonly ports: RemoveResourcePorts, private readonly userClient: UserClient) {
		super(userClient);
	}

	async removeResource(input: RemoveResourceInput) {
		try {
			this.validateInput(input, removeResourceInputSchema, REMOVE_RESOURCE_USECASE_ERRORS.INVALID_INPUT);
			await this.isUserAuthorized(input.username);

			const resourceResponse = await this.ports.getResourceById({ resourceId: input.resourceId });
			
            if (!resourceResponse) return errorResponse(REMOVE_RESOURCE_USECASE_ERRORS.RESOURCE_NOT_FOUND);
			if (resourceResponse.published) return errorResponse(REMOVE_RESOURCE_USECASE_ERRORS.REMOVE_NOT_ALLOWED);

			await this.ports.removeResource({ resourceId: input.resourceId });

			return successResponse(REMOVE_RESOURCE_USECASE_SUCCESS.DEFAULT);
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : REMOVE_RESOURCE_USECASE_ERRORS.DEFAULT);
		}
	}
}
