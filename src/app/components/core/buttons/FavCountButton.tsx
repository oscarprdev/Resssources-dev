import { IconHeartFilled } from '@tabler/icons-react';

type FavCountButtonProps = {
	favCount: number;
};

const FavCountButton = ({ favCount }: FavCountButtonProps) => {
	return (
		<div className='flex items-center gap-1 py-1 px-2 border border-zinc-300 rounded-full'>
			<IconHeartFilled
				className='text-zinc-300'
				size={15}
			/>
			<p className='text-sm text-zinc-300'>{favCount}</p>
		</div>
	);
};

export default FavCountButton;
