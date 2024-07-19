import { Badge } from '../../ui/badge';
import DetailButton from '../buttons/DetailButton';
import FavCountButton from '../buttons/FavCountButton';
import LikeButton from '../buttons/LikeButton';
import ResourceDescription from './ResourceDescription';
import { Kinds } from '@/features/resources/shared/resources.types';
import Image from 'next/image';

type ResourceCardProps = {
	resourceId: string;
	title: string;
	description: string;
	imgUrl: string;
	resourceUrl: string;
	owner: string;
	isLiked: boolean;
	favCount: number;
	kinds: Kinds;
};

const ResourceCard = ({
	resourceId,
	resourceUrl,
	title,
	description,
	imgUrl,
	owner,
	isLiked,
	favCount,
	kinds,
}: ResourceCardProps) => {
	return (
		<article
			id={`resource-card-${resourceId}`}
			className="show-card relative flex flex-col min-w-[320px] h-fit gap-5 items-center p-2 bg-white border border-zinc-100 shadow-sm rounded-5xl">
			<div className="absolute left-4 top-4">
				<LikeButton resourceId={resourceId} isLiked={isLiked} />
			</div>

			<picture className="grid place-items-center overflow-hidden w-full h-[220px]">
				<Image
					src={imgUrl}
					alt="Resource image"
					width={600}
					height={600}
					className="w-full h-full rounded-3xl object-cover border border-zinc-100"
				/>
			</picture>
			<div className="flex flex-col gap-2 w-full px-2">
				<p className="text-xs text-zinc-400">@{owner}</p>
				<h4 className="text-zinc-700 uppercase -mt-2 text-xl truncate">{title}</h4>
				<ResourceDescription
					description={description}
					triggerClass="text-sm truncate text-zinc-500 hover:text-zinc-300"
				/>
				<div className="flex items-center space-x-2 mt-2">
					{kinds.map(kind => (
						<Badge key={kind}>{kind}</Badge>
					))}
				</div>
				<div className="flex justify-between items-center mt-5 mb-2 w-full">
					<FavCountButton favCount={favCount} />
					<DetailButton resourceId={resourceId} />
				</div>
			</div>
		</article>
	);
};

export default ResourceCard;
