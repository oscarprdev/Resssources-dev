import { API_URL } from '@/constants';
import { CREATE_RESOURCES_ERRORS } from '@/features/resources/create/application/create-resources.constants';
import { Either, errorResponse, successResponse } from '@/lib/either';
import { $Enums } from '@prisma/client';

export type AddResourceInput = {
	url: string;
	kinds: $Enums.Kind[];
	username: string;
};

export const useAddResource = () => {
	const addResource = async ({ url, kinds, username }: AddResourceInput): Promise<Either<string, string>> => {
		try {
			const body = JSON.stringify({ username, url, kinds });

			const response = await fetch(`${API_URL}/api/resources/create`, {
				method: 'POST',
				body,
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const jsonResponse = await response.json();

			return successResponse(jsonResponse);
		} catch (error) {
			console.error(error);
			return errorResponse(error instanceof Error ? error.message : CREATE_RESOURCES_ERRORS.DEFAULT);
		}
	};

	return { addResource };
};
