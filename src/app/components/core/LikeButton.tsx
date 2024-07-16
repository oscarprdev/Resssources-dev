import { Button } from '../ui/button';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

type LikeButtonProps = {
	resourceId: string;
	isLiked: boolean;
};

const LikeButton = ({ resourceId, isLiked }: LikeButtonProps) => {
	return (
		<Button
			variant={'outline'}
			size={'like'}
			className='group hover:bg-zinc-50'>
			{isLiked ? (
				<IconHeartFilled
					className='text-red-500 group-hover:text-zinc-500'
					size={20}
				/>
			) : (
				<IconHeart
					size={20}
					className='text-zinc-500 group-hover:text-red-500 group-hover:fill-red-500'
				/>
			)}
		</Button>
	);
};

export default LikeButton;
