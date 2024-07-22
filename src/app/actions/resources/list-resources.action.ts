'use server';

import { provideListResourceUsecase } from '@/features/resources/list';
import { Kinds } from '@/features/shared/types/global.types';

type ListResourcesActionInput = { kindsFilter: Kinds; cursor?: string; userId?: string };

export const listResourcesAction = async ({ kindsFilter, cursor, userId }: ListResourcesActionInput) => {
	const listResourcesUsecase = provideListResourceUsecase();
	const resourcesResponse = await listResourcesUsecase.listResources({
		userId,
		published: true,
		withUserData: true,
		itemsPerRequest: 8,
		kinds: kindsFilter,
		cursor,
	});

	return resourcesResponse;
};
