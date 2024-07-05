import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
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
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<picture className='relative block w-[220px] h-[220px] rounded-md overflow-hidden shadow-md'>
									<Image
										src={imgUrl}
										alt={title}
										layout='fill'
										objectFit='cover'
									/>
								</picture>
							</TooltipTrigger>
							<TooltipContent>
								<p>{title}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
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
