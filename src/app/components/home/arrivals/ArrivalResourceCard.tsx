import DetailButton from '../../core/buttons/DetailButton';
import LikeButton from '../../core/buttons/LikeButton';
import UserButton from '../../core/buttons/UserButton';
import ResourceDescription from '../../core/containers/ResourceDescription';
import { Badge } from '../../ui/badge';
import { $Enums } from '@prisma/client';
import Image from 'next/image';

export type ArrivalResourceCardProps = {
	resourceId: string;
	resourceUrl: string;
	imgUrl: string;
	title: string;
	description: string;
	owner: string;
	isLiked: boolean;
	kinds: $Enums.Kind[];
};

const ArrivalResourceCard = ({
	resourceId,
	resourceUrl,
	imgUrl,
	title,
	description,
	owner,
	isLiked,
	kinds,
}: ArrivalResourceCardProps) => {
	return (
		<article className="show-card flex items-center justify-between space-x-4 bg-white rounded-2xl p-5 shadow-lg">
			<picture className="grid place-items-center rounded-2xl shadow-md w-1/3 h-[150px] min-w-[150px]">
				<Image
					src={imgUrl}
					alt="Arrival resource image"
					width={500}
					height={500}
					className="object-cover w-full h-full rounded-2xl"
				/>
			</picture>
			<div className="w-full flex flex-col items-start gap-1 pl-5 border border-transparent border-l-zinc-100">
				<UserButton username={owner} />
				<h4 className="text-2xl uppercase -mt-1 truncate max-w-[90%]">{title}</h4>
				<ResourceDescription
					description={description}
					triggerClass="text-zinc-500 max-w-[300px] truncate text-sm hover:text-zinc-300"
				/>
				<div className="flex items-center space-x-2 mt-2">
					{kinds.map(kind => (
						<Badge key={kind}>{kind}</Badge>
					))}
				</div>
				<div className="w-full flex items-center justify-between mt-2 -mb-2">
					<div className="ml-auto flex space-x-2">
						<LikeButton resourceId={resourceId} isLiked={isLiked} />
						<DetailButton resourceUrl={resourceUrl} />
					</div>
				</div>
			</div>
		</article>
	);
};

export default ArrivalResourceCard;
