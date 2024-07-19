'use client';

import { Button } from '../../ui/button';
import { useOptimiticLike } from '@/app/hooks/useOptimisticLike';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

type LikeButtonProps = {
	resourceId: string;
	isLiked: boolean;
};

const LikeButton = ({ resourceId, isLiked }: LikeButtonProps) => {
	const { optimisticLike, handleClick } = useOptimiticLike({ resourceId, isLiked });

	return (
		<Button
			id={`like-button-${resourceId}`}
			type="button"
			variant={'outline'}
			size={'like'}
			onClick={handleClick}
			className="group hover:bg-zinc-50 duration-200">
			{optimisticLike ? (
				<IconHeartFilled className="text-red-500 group-hover:text-zinc-300 duration-200" size={20} />
			) : (
				<IconHeart
					size={20}
					className="text-zinc-300 group-hover:text-red-500 group-hover:fill-red-500 duration-200"
				/>
			)}
		</Button>
	);
};

export default LikeButton;
