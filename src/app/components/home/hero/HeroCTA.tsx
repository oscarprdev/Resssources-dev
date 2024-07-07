import Link from 'next/link';

const HeroCTA = () => {
	return (
		<div className='grid place-items-center p-2 rounded-full border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200'>
			<Link
				href={'/all'}
				className='bg-white rounded-full shadow-md grid place-items-center w-full h-full py-3 px-9'>
				<p className='text-sm'>Explore</p>
			</Link>
		</div>
	);
};

export default HeroCTA;
