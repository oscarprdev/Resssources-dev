'use client';

import { listResourcesBySearchAction } from '../actions/resources/list-resources-by-search.action';
import { KindSelected } from '../components/core/header/SearchResourcesInput';
import { toast } from '../components/ui/use-toast';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { ResourceSearched } from '@/features/shared/types/global.types';
import { isError } from '@/lib/either';
import { startTransition, useEffect, useState } from 'react';

type UseListResourcesBySearchInput = {
	inputValue: string;
	kindSelected?: KindSelected;
};

export const useListResourcesBySearch = ({ inputValue, kindSelected }: UseListResourcesBySearchInput) => {
	const [resources, setResources] = useState<ResourceSearched[]>([]);
	const [lastItem, setLastItem] = useState<string>();
	const [moreItems, setMoreItems] = useState(false);
	const [loading, setLoading] = useState(false);

	const getResourcesBySearch = async () => {
		setLoading(true);
		const resourcesResponse = await listResourcesBySearchAction({
			kinds: kindSelected && kindSelected !== 'all' ? [kindSelected] : RESOURCE_KIND_VALUES,
			value: inputValue,
			itemsPerRequest: 4,
		});

		if (isError(resourcesResponse)) {
			return toast({
				variant: 'destructive',
				description: resourcesResponse.error,
			});
		}

		const { items, cursor, moreItems } = resourcesResponse.success;

		startTransition(() => {
			setResources(items);
			setLastItem(cursor);
			setMoreItems(moreItems);
			setLoading(false);
		});
	};

	useEffect(() => {
		if (inputValue.length > 0) {
			getResourcesBySearch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue, kindSelected]);

	const loadMoreItems = async () => {
		setLoading(true);
		const resourcesResponse = await listResourcesBySearchAction({
			cursor: lastItem,
			kinds: kindSelected && kindSelected !== 'all' ? [kindSelected] : RESOURCE_KIND_VALUES,
			value: inputValue,
			itemsPerRequest: 4,
		});

		if (isError(resourcesResponse)) {
			toast({
				variant: 'destructive',
				description: resourcesResponse.error,
			});

			return;
		}

		const { items, cursor, moreItems } = resourcesResponse.success;

		startTransition(() => {
			setResources(prev => [...prev, ...items]);
			setLastItem(cursor);
			setMoreItems(moreItems);
			setLoading(false);
		});
	};

	return {
		resources,
		lastItem,
		moreItems,
		loading,
		loadMoreItems,
	};
};
