'use client';

import { listResourcesBySearchAction } from '../actions/resources/list-resources-by-search.action';
import { KindSelected } from '../components/core/header/SearchResourcesInput';
import { toast } from '../components/ui/use-toast';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { ResourceSearched } from '@/features/shared/types/global.types';
import { isError } from '@/lib/either';
import { useEffect, useState } from 'react';

type UseListResourcesBySearchInput = {
	inputValue: string;
	kindSelected?: KindSelected;
};

export const useListResourcesBySearch = ({ inputValue, kindSelected }: UseListResourcesBySearchInput) => {
	const [resources, setResources] = useState<ResourceSearched[]>([]);

	useEffect(() => {
		const getResourcesBySearch = async () => {
			const lastResourceFounded =
				Array.isArray(resources) && resources.length > 0 ? resources[resources.length - 1] : undefined;

			const resourcesResponse = await listResourcesBySearchAction({
				cursor: lastResourceFounded?.id,
				kinds: kindSelected && kindSelected !== 'all' ? [kindSelected] : RESOURCE_KIND_VALUES,
				value: inputValue,
			});

			if (isError(resourcesResponse)) {
				return toast({
					variant: 'destructive',
					description: resourcesResponse.error,
				});
			}

			setResources(resourcesResponse.success);
		};

		if (inputValue.length > 0) {
			getResourcesBySearch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue, kindSelected]);

	return {
		resources,
	};
};
