import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import Image from 'next/image';

type HeroResourceItemProps = {
	resourceId: string;
	imgUrl: string;
};

const HeroResourceItem = ({ resourceId, imgUrl }: HeroResourceItemProps) => {
	return (
		<li>
			<Dialog>
				<DialogTrigger>
					<picture className="relative block w-[220px] h-[220px] rounded-3xl overflow-hidden shadow-md">
						<Image
							src={imgUrl}
							alt="Resource hero image"
							className="object-cover w-full h-full"
							height={500}
							width={500}
						/>
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
