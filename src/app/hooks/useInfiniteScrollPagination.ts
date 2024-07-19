import { toast } from '../components/ui/use-toast';
import { Either, isError } from '@/lib/either';
import { useEffect, useMemo, useRef, useState } from 'react';

type PaginationResponse = {
	moreItems: boolean;
	cursor?: string;
	items: any[];
};

interface InputAction<I> {
	values: I;
	cursor?: string;
}

export type UseInfiniteScrollPaginationInput<I, R> = {
	inputAction: InputAction<I>;
	provideLastItemId: (cursor: string) => string;
	fetchAction: (input: InputAction<I>) => Promise<Either<string, R>>;
};

export const useInfiniteScrollPagination = <I, R extends PaginationResponse>({
	inputAction,
	provideLastItemId,
	fetchAction,
}: UseInfiniteScrollPaginationInput<I, R>) => {
	const [loading, setLoading] = useState(false);
	const [paginationState, setPaginationState] = useState<PaginationResponse>({
		moreItems: false,
		items: [],
	});

	const lastResource = useRef<HTMLElement | null>(null);

	const handleFetchAction = async (input: InputAction<I>) => {
		setLoading(true);

		const response = await fetchAction({ values: input.values, cursor: input.cursor });
		if (isError(response)) {
			setLoading(false);

			return toast({
				variant: 'destructive',
				description: response.error,
			});
		}

		const { items, cursor, moreItems } = response.success;
		setPaginationState({
			items: lastResource.current && 'cursor' in input ? [...paginationState.items, ...items] : items,
			cursor,
			moreItems,
		});
		setLoading(false);
	};

	const observer = useMemo(
		() =>
			new IntersectionObserver(
				async (entries: IntersectionObserverEntry[]) => {
					const entry = entries[0];
					if (entry.isIntersecting && lastResource.current) {
						observer.unobserve(lastResource.current);
						if (paginationState.moreItems && !loading) {
							await handleFetchAction({ values: inputAction.values, cursor: paginationState.cursor });
						}
					}
				},
				{ threshold: 0.5 }
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[paginationState.items]
	);

	const updateLastResourceObserved = (items: R[], cursor?: string) => {
		if (items.length > 0 && cursor) {
			const lastItemId = provideLastItemId(cursor);
			lastResource.current = document.getElementById(lastItemId);

			if (lastResource.current) {
				observer.observe(lastResource.current);
			}
		}
	};

	useEffect(() => {
		handleFetchAction(inputAction);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		updateLastResourceObserved(paginationState.items, paginationState.cursor);

		return () => observer.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paginationState.items, paginationState.cursor]);

	return {
		paginationState,
		loading,
		handleFetchAction,
	};
};
