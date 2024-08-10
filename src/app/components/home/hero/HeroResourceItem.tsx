import Image from 'next/image';
import Link from 'next/link';

type HeroResourceItemProps = {
	resourceUrl: string;
	imgUrl: string;
	title: string;
};

const HeroResourceItem = ({ resourceUrl, imgUrl, title }: HeroResourceItemProps) => {
	return (
		<li>
			<Link
				href={resourceUrl}
				target="_blank"
				className="relative block size-[150px]  sm:size-[220px] rounded-3xl overflow-hidden shadow-md group">
				<Image
					src={imgUrl}
					alt="Resource hero image"
					className="object-cover w-full h-full"
					height={500}
					width={500}
				/>
				<div className="absolute top-0 w-full h-full grid place-items-center opacity-0 group-hover:opacity-100 duration-500">
					<div className="inset-0 w-full h-full absolute top-0 bg-black/50 blur-md"></div>
					<p className="text-white uppercase text-lg font-black opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
						{title}
					</p>
				</div>
			</Link>
		</li>
	);
};

export default HeroResourceItem;
