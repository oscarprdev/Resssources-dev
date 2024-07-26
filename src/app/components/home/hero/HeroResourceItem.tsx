import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import Image from 'next/image';

type HeroResourceItemProps = {
	resourceId: string;
	imgUrl: string;
	title: string;
};

const HeroResourceItem = ({ resourceId, imgUrl, title }: HeroResourceItemProps) => {
	return (
		<li>
			<Dialog>
				<DialogTrigger>
					<picture className="relative block w-[220px] h-[220px] rounded-3xl overflow-hidden shadow-md group">
						<Image
							src={imgUrl}
							alt="Resource hero image"
							className="object-cover w-full h-full"
							height={500}
							width={500}
						/>
						<div className="absolute top-0 w-full h-full grid place-items-center opacity-0 group-hover:opacity-100 duration-500">
							<div className="inset-0 w-full h-full absolute top-0 bg-black/50 blur-md"></div>
							<p className="text-white uppercase text-lg font-black opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 duration-700">
								{title}
							</p>
						</div>
					</picture>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{resourceId}</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</li>
	);
};

export default HeroResourceItem;
