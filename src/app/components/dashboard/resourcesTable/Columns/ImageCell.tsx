import Image from 'next/image';

type ImageCellProps = {
	imgUrl: string;
};

const ImageCell = ({ imgUrl }: ImageCellProps) => {
	return (
		<picture className='rounded-2xl size-[60px] grid place-items-center shadow-sm'>
			<Image
				src={imgUrl}
				alt='Resource image'
				width={500}
				height={500}
				className='object-cover rounded-2xl w-full h-full'
			/>
		</picture>
	);
};

export default ImageCell;
