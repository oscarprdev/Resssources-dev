type InfoCellProp = {
	faviconUrl: string;
	title: string;
	description: string;
};

const InfoCell = ({ faviconUrl, title, description }: InfoCellProp) => {
	return (
		<div className='flex items-start space-x-2 max-w-[350px] '>
			<picture className='size-4 overflow-hidden rounded-full grid place-items-center'>
				<img
					src={faviconUrl}
					alt='Resource favicon'
					width={500}
					height={500}
					className='object-cover w-full h-full'
				/>
			</picture>
			<div className='w-full flex flex-col space-y-1 max-w-[300px] -mt-[1px]'>
				<p className='text-sm font-bold truncate capitalize text-zinc-600'>{title}</p>
				<p className='text-xs text-zinc-600 truncate'>{description}</p>
			</div>
		</div>
	);
};

export default InfoCell;
