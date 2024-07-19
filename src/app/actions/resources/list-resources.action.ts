'use server';

import { provideListResourceUsecase } from '@/features/resources/list';
import { Kinds } from '@/features/shared/types/global.types';

type ListResourcesActionInput = { kindsFilter: Kinds; cursor?: string };

export const listResourcesAction = async ({ kindsFilter, cursor }: ListResourcesActionInput) => {
	const listResourcesUsecase = provideListResourceUsecase();
	const resourcesResponse = await listResourcesUsecase.listResources({
		published: true,
		withUserData: true,
		itemsPerRequest: 2,
		kinds: kindsFilter,
		cursor,
	});

	return resourcesResponse;
};
