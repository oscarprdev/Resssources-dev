import { listResourcesAction } from '../actions/resources/list-resources.action';
import { toast } from '../components/ui/use-toast';
import { Kinds, ResourceWithUserInfo } from '@/features/resources/shared/resources.types';
import { isError } from '@/lib/either';
import { useEffect, useMemo, useRef, useState } from 'react';

export const useScrollResourcesList = (kindsFilter: Kinds) => {
	const [loading, setLoading] = useState(false);
	const [resources, setResources] = useState<ResourceWithUserInfo[]>([]);
	const [moreItems, setMoreItems] = useState(false);
	const [cursor, setCursor] = useState<string | null>(null);

	const lastResource = useRef<HTMLElement | null>(null);

	const handleListResources = async (kindsFilter: Kinds, currentCursor: string | null) => {
		setLoading(true);

		const response = await listResourcesAction(kindsFilter, currentCursor);
		if (isError(response)) {
			setLoading(false);
			return toast({
				variant: 'destructive',
				description: response.error,
			});
		}

		const { resources: newResources, moreItems, cursor } = response.success;

		setResources(prev => [...prev, ...newResources]);
		setMoreItems(moreItems);
		setCursor(cursor);

		setLoading(false);
	};

	const observer = useMemo(
		() =>
			new IntersectionObserver(
				async (entries: IntersectionObserverEntry[]) => {
					const entry = entries[0];
					if (entry.isIntersecting && lastResource.current) {
						observer.unobserve(lastResource.current);
						if (moreItems && !loading) {
							await handleListResources(kindsFilter, cursor);
						}
					}
				},
				{ threshold: 0.5 }
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[kindsFilter, moreItems, cursor]
	);

	const updateLastResourceObserved = () => {
		if (resources.length > 0 && cursor) {
			lastResource.current = document.getElementById(`resource-card-${cursor}`);

			if (lastResource.current) {
				observer.observe(lastResource.current);
			}
		}
	};

	useEffect(() => {
		handleListResources(kindsFilter, cursor);

		return () => observer.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kindsFilter]);

	useEffect(() => {
		updateLastResourceObserved();

		return () => observer.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resources]);

	return { resources, loading };
};
