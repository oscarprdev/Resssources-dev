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
			const response = await fetch('http://localhost:3000/api/resources/create', {
				method: 'POST',
				body,
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return successResponse('Resource created successfully');
		} catch (error) {
			return errorResponse(error instanceof Error ? `Error creating resource: ${error.message}` : 'Error creating resource');
		}
	};

	return { addResource };
};
