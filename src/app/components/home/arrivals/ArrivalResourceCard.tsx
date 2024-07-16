import { $Enums } from '@prisma/client';
import Image from 'next/image';
import { Badge } from '../../ui/badge';
import ArrivalIcon from './ArrivalIcon';

export type ArrivalResourceCardProps = {
	imgUrl: string;
	title: string;
	description: string;
	owner: string;
	kinds: $Enums.Kind[];
};

const ArrivalResourceCard = ({ imgUrl, title, description, owner, kinds }: ArrivalResourceCardProps) => {
	return (
		<article className='flex items-center space-x-4 bg-white rounded-2xl p-5 shadow-lg'>
			<picture className='grid place-items-center rounded-2xl shadow-md w-1/3 h-[150px] min-w-[150px]'>
				<Image
					src={imgUrl}
					alt='Arrival resource image'
					width={500}
					height={600}
					className='object-cover w-full h-full rounded-2xl'
				/>
			</picture>
			<div className='flex flex-col items-start gap-1 h-[150px] pl-5 border border-transparent border-l-zinc-100'>
				<p className='text-zinc-500 text-xs'>@{owner}</p>
				<h4 className='text-2xl uppercase -mt-2'>{title}</h4>
				<p className='text-zinc-500 max-w-[250px] truncate text-sm'>{description}</p>
				<div className='flex items-center space-x-2 mt-2'>
					{kinds.map((kind) => (
						<Badge key={kind}>{kind}</Badge>
					))}
				</div>
			</div>
		</article>
	);
};

export default ArrivalResourceCard;
