import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';

type DetailButtonProps = {
	resourceId: string;
};

const DetailButton = ({ resourceId }: DetailButtonProps) => {
	return (
		<Link
			href={`/resource/${resourceId}`}
			className='group p-2 border border-zinc-200 rounded-full hover:bg-blue-500 hover:border-blue-500 duration-200'>
			<IconArrowUpRight
				className='text-zinc-300 group-hover:text-white duration-200'
				size={20}
			/>
		</Link>
	);
};

export default DetailButton;
