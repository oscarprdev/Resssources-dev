import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import Image from 'next/image';

type HeroResourceItemProps = {
	resourceId: string;
	title: string;
	imgUrl: string;
};

const HeroResourceItem = ({ resourceId, title, imgUrl }: HeroResourceItemProps) => {
	return (
		<li>
			<Dialog>
				<DialogTrigger>
					<picture className='relative block w-[220px] h-[220px] rounded-md overflow-hidden shadow-md'>
						<Image
							src={imgUrl}
							alt={title}
							layout='fill'
							objectFit='cover'
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
