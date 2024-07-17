'use client';

import { startTransition, useEffect, useOptimistic } from 'react';
import { Button } from '../../ui/button';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { updateResourceFav } from '@/app/actions/resources/update-resource-fav';
import { isError } from '@/lib/either';
import { toast } from '../../ui/use-toast';

type LikeButtonProps = {
	resourceId: string;
	isLiked: boolean;
};

const LikeButton = ({ resourceId, isLiked }: LikeButtonProps) => {
	const [optimisticLike, toggleOptimisticLike] = useOptimistic(isLiked, (state: boolean) => !state);

	const handleClick = async () => {
		startTransition(async () => {
			toggleOptimisticLike(optimisticLike);

			const response = await updateResourceFav({ resourceId, favourited: !isLiked });
			if (isError(response)) {
				toast({
					variant: 'destructive',
					description: response.error,
				});

				toggleOptimisticLike(!isLiked);
			}
		});
	};

	return (
		<Button
			type='button'
			variant={'outline'}
			size={'like'}
			onClick={handleClick}
			className='group hover:bg-zinc-50 duration-200'>
			{optimisticLike ? (
				<IconHeartFilled
					className='text-red-500 group-hover:text-zinc-300 duration-200'
					size={20}
				/>
			) : (
				<IconHeart
					size={20}
					className='text-zinc-300 group-hover:text-red-500 group-hover:fill-red-500 duration-200'
				/>
			)}
		</Button>
	);
};

export default LikeButton;
