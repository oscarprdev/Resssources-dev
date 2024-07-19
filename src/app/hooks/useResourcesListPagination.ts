import { listResourcesAction } from '../actions/resources/list-resources.action';
import { useInfiniteScrollPagination } from './useInfiniteScrollPagination';
import { ListResourcesOutput } from '@/features/resources/list/application/list-resources.use-case.types';
import { Kinds } from '@/features/shared/types/global.types';
import { useEffect } from 'react';

let kindsFiltered: Kinds = [];

export const useResourcesListWithPagination = (kindsFilter: Kinds) => {
	const {
		loading,
		paginationState: { items },
		handleFetchAction,
	} = useInfiniteScrollPagination<Kinds, ListResourcesOutput>({
		provideLastItemId: (cursor: string) => `resource-card-${cursor}`,
		inputAction: { values: kindsFilter },
		fetchAction: async input => await listResourcesAction({ kindsFilter: input.values, cursor: input.cursor }),
	});

	useEffect(() => {
		handleFetchAction({ values: kindsFilter });

		kindsFiltered = kindsFilter;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kindsFilter]);

	return {
		resources: items,
		loading: kindsFilter.length > 0 && kindsFiltered === kindsFilter ? false : loading,
	};
};
