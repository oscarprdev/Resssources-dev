import ArrivalIcon from './ArrivalIcon';
import ArrivalResourceCard from './ArrivalResourceCard';
import { ResourceWithUserInfo } from '@/features/resources/shared/resources.types';
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';

type ArrivalsCardProps = {
	resources: ResourceWithUserInfo[];
};

const ArrivalsCard = async ({ resources }: ArrivalsCardProps) => {
	return (
		<article className="show-container relative w-[90%] max-w-[1000px] h-[500px] flex items-center gap-10 px-5 rounded-3xl shadow-lg overflow-hidden">
			<div className="absolute inset-0 -z-10 h-full w-full rounded-3xl bg-blue-600 bg-[radial-gradient(var(--card-dots)_1px,transparent_1px)] [background-size:16px_16px]"></div>

			<div className="flex flex-col items-start space-y-6 ml-10">
				<span aria-hidden className="bg-white w-[17px] h-[7px] rounded-full -mb-3"></span>
				<h3 className="text-white text-5xl max-w-[10px]">New Arrivals</h3>
				<p className="text-xl text-white">
					Look to the Latest Resources <span className="font-bold">Shared by our Community</span>
				</p>

				<Link
					href={'/resources'}
					className="group flex items-center gap-1 py-2 px-5 border bg-white rounded-full text-blue-500 text-xs hover:bg-transparent hover:text-white duration-200">
					Find more
					<IconArrowUpRight size={18} className="text-blue-500 group-hover:text-white" />
				</Link>
			</div>
			<ArrivalIcon position="absolute left-[30%] top-24" />
			<ArrivalIcon position="absolute left-[31.2%] top-24" />
			<div className="flex flex-col items-center space-y-5 h-full overflow-y-scroll py-5">
				{resources.map(resource => (
					<ArrivalResourceCard
						key={resource.id}
						resourceId={resource.id}
						resourceUrl={resource.resourceUrl}
						imgUrl={resource.imgUrl}
						title={resource.title}
						description={resource.description}
						owner={resource.resourceCreatedBy[0].username}
						isLiked={resource.favouritedBy.some(
							user => user.userId === resource.resourceCreatedBy[0].userId
						)}
						kinds={resource.kind}
					/>
				))}
			</div>
		</article>
	);
};

export default ArrivalsCard;
