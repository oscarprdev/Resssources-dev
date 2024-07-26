'use server';

import { provideListResourceUsecase } from '@/features/resources/list';
import { Kinds, ResourceType } from '@/features/shared/types/global.types';

type ListProfileResourcesActionInput = {
	kindsFilter: Kinds;
	resourceType: ResourceType;
	cursor?: string;
	userId: string;
};

export const listProfileResourcesAction = async ({
	kindsFilter,
	resourceType,
	cursor,
	userId,
}: ListProfileResourcesActionInput) => {
	const listResourcesUsecase = provideListResourceUsecase();
	const resourcesResponse = await listResourcesUsecase.listProfileResources({
		userId,
		published: true,
		withUserData: true,
		itemsPerRequest: 8,
		kinds: kindsFilter,
		cursor,
		resourceType,
	});

	return resourcesResponse;
};
