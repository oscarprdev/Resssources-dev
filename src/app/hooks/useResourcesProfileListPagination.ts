import { listProfileResourcesAction } from '../actions/resources/list-profile-resources.action';
import { useInfiniteScrollPagination } from './useInfiniteScrollPagination';
import { ListResourcesOutput } from '@/features/resources/list/application/list-resources.use-case.types';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { Kinds, ResourceType } from '@/features/shared/types/global.types';
import { useEffect } from 'react';

export const useResourcesProfileListWithPagination = (
	kindsFilter: Kinds | null,
	resourceType: ResourceType,
	userId: string
) => {
	const {
		loading,
		paginationState: { items },
		handleFetchAction,
	} = useInfiniteScrollPagination<{ kinds: Kinds; resourceType: ResourceType }, ListResourcesOutput>({
		provideLastItemId: (cursor: string) => `resource-card-${cursor}`,
		inputAction: {
			values: {
				kinds: kindsFilter || RESOURCE_KIND_VALUES,
				resourceType,
			},
		},
		fetchAction: async input =>
			await listProfileResourcesAction({
				kindsFilter: input.values.kinds,
				cursor: input.cursor,
				userId,
				resourceType: input.values.resourceType,
			}),
	});

	useEffect(() => {
		if (Array.isArray(kindsFilter) && kindsFilter.length > 0 && resourceType) {
			handleFetchAction({
				values: {
					kinds: kindsFilter,
					resourceType,
				},
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kindsFilter, resourceType]);

	return {
		resources: items,
		loading,
	};
};
