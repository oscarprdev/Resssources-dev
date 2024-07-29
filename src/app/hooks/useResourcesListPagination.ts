import { listResourcesAction } from '../actions/resources/list-resources.action';
import { useInfiniteScrollPagination } from './useInfiniteScrollPagination';
import { ListResourcesOutput } from '@/features/resources/list/application/list-resources.use-case.types';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { Kinds } from '@/features/shared/types/global.types';
import { useEffect, useState } from 'react';

let currentFilters: Kinds = [];

export const useResourcesListWithPagination = (kindsFilter: Kinds, userId?: string) => {
	const [loadingSkeletonShouldShow, setLoadingSkeletonShouldShow] = useState(false);
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
		const isValidArrayKindsFilter = Array.isArray(kindsFilter) && kindsFilter.length > 0;
		const loadingSkeletonShouldShow =
			!currentFilters.includes(kindsFilter[kindsFilter.length - 1]) ||
			currentFilters.length !== kindsFilter.length;

		if (isValidArrayKindsFilter && loadingSkeletonShouldShow) {
			setLoadingSkeletonShouldShow(true);
		} else {
			setLoadingSkeletonShouldShow(false);
		}

		if (isValidArrayKindsFilter) {
			handleFetchAction({ values: kindsFilter }).then(() => setLoadingSkeletonShouldShow(false));
			currentFilters = kindsFilter;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kindsFilter]);

	return {
		resources: items,
		loading: loading && loadingSkeletonShouldShow,
	};
};
