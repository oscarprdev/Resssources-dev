import { updateResourceFav } from '../actions/resources/update-resource-fav';
import { toast } from '../components/ui/use-toast';
import { isError } from '@/lib/either';
import { useEffect, useState } from 'react';

type UseOptimisticLikeInput = {
	isLiked: boolean;
	resourceId: string;
};

export const useOptimiticLike = ({ isLiked, resourceId }: UseOptimisticLikeInput) => {
	const [optimisticLike, setOptimisticLike] = useState(isLiked);

	const handleClick = async () => {
		setOptimisticLike(!optimisticLike);

		const response = await updateResourceFav({
			resourceId,
			favourited: !optimisticLike,
		});
		if (isError(response)) {
			toast({
				variant: 'destructive',
				description: response.error,
			});

			setOptimisticLike(!isLiked);
		}
	};

	useEffect(() => {
		setOptimisticLike(isLiked);
	}, [isLiked]);

	return {
		handleClick,
		optimisticLike,
	};
};
