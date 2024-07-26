import { listResourcesAction } from '../actions/resources/list-resources.action';
import { useInfiniteScrollPagination } from './useInfiniteScrollPagination';
import { ListResourcesOutput } from '@/features/resources/list/application/list-resources.use-case.types';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { Kinds } from '@/features/shared/types/global.types';
import { useEffect } from 'react';

export const useResourcesListWithPagination = (kindsFilter: Kinds | null, userId?: string) => {
	const {
		loading,
		paginationState: { items },
		handleFetchAction,
	} = useInfiniteScrollPagination<Kinds, ListResourcesOutput>({
		provideLastItemId: (cursor: string) => `resource-card-${cursor}`,
		inputAction: { values: kindsFilter || RESOURCE_KIND_VALUES },
		fetchAction: async input =>
			await listResourcesAction({ kindsFilter: input.values, cursor: input.cursor, userId }),
	});

	useEffect(() => {
		if (Array.isArray(kindsFilter) && kindsFilter.length > 0) {
			handleFetchAction({ values: kindsFilter });
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kindsFilter]);

	return {
		resources: items,
		loading,
	};
};
