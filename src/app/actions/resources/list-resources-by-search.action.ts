'use server';

import { provideListResourceUsecase } from '@/features/resources/list';
import { Kinds } from '@/features/shared/types/global.types';

type ListResourcesBySearchActionInput = {
	cursor?: string;
	kinds: Kinds;
	value: string;
	itemsPerRequest: number;
};

export const listResourcesBySearchAction = async ({
	cursor,
	kinds,
	value,
	itemsPerRequest,
}: ListResourcesBySearchActionInput) => {
	const usecase = provideListResourceUsecase();

	return await usecase.listResourcesBySearch({ cursor, kinds, value, itemsPerRequest });
};
