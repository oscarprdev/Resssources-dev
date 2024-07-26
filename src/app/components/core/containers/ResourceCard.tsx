import { Badge } from '../../ui/badge';
import DetailButton from '../buttons/DetailButton';
import FavCountButton from '../buttons/FavCountButton';
import LikeButton from '../buttons/LikeButton';
import ResourceDescriptionTooltip from '../tooltips/ResourceDescriptionTooltip';
import UserNameTooltip from '../tooltips/UserNameTooltip';
import { Kinds } from '@/features/resources/shared/resources.types';
import Image from 'next/image';
import { ReactNode, createContext, useContext } from 'react';

export type ResourceCardProps = {
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

type ResourceCardContentProps = Pick<
	ResourceCardProps,
	'title' | 'description' | 'owner' | 'favCount' | 'kinds' | 'resourceUrl'
>;

type ResourceCardContentFooterProps = Pick<ResourceCardContentProps, 'favCount' | 'resourceUrl'>;

const ResourceCardContext = createContext<ResourceCardProps | undefined>(undefined);
const ResourceCardContentContext = createContext<ResourceCardContentProps | undefined>(undefined);
const ResourceCardContentFooterContext = createContext<ResourceCardContentFooterProps | undefined>(undefined);

const useResourceCardContext = () => {
	const context = useContext(ResourceCardContext);
	if (!context) throw new Error('useResourceCardContext must be used within a ResourceCard');

	return context;
};

const ResourceCard = ({ props, children }: { props: ResourceCardProps; children: ReactNode }) => {
	return (
		<ResourceCardContext.Provider value={{ ...props }}>
			<article
				id={`resource-card-${props.resourceId}`}
				className="show-card relative flex flex-col min-w-[320px] h-fit gap-5 items-center p-2 bg-white border border-zinc-100 shadow-sm rounded-5xl">
				{children}
			</article>
		</ResourceCardContext.Provider>
	);
};

ResourceCard.Content = function ResourceCardContent({ children }: { children: ReactNode }) {
	const { title, owner, description, kinds, favCount, resourceUrl } = useResourceCardContext();
	return (
		<ResourceCardContentContext.Provider value={{ title, owner, description, kinds, favCount, resourceUrl }}>
			<div className="flex flex-col gap-2 w-full px-2">{children}</div>
		</ResourceCardContentContext.Provider>
	);
};

ResourceCard.Footer = function ResourceCardContentFooter({ children }: { children: ReactNode }) {
	const { favCount, resourceUrl } = useResourceCardContext();
	return (
		<ResourceCardContentFooterContext.Provider value={{ favCount, resourceUrl }}>
			<div className="flex justify-between items-center mt-5 mb-2 w-full">{children}</div>
		</ResourceCardContentFooterContext.Provider>
	);
};

ResourceCard.Like = function ResourceCardLike() {
	const { resourceId, isLiked } = useResourceCardContext();
	return (
		<div className="absolute left-4 top-4">
			<LikeButton resourceId={resourceId} isLiked={isLiked} />
		</div>
	);
};

ResourceCard.Image = function ResourceCardImage() {
	const { imgUrl } = useResourceCardContext();

	return (
		<picture className="grid place-items-center overflow-hidden w-full h-[220px]">
			<Image
				src={imgUrl}
				alt="Resource image"
				width={600}
				height={600}
				className="w-full h-full rounded-3xl object-cover border border-zinc-100"
			/>
		</picture>
	);
};

ResourceCard.Owner = function ResourceCardOwner() {
	const { owner } = useResourceCardContext();

	return <UserNameTooltip username={owner} />;
};

ResourceCard.Title = function ResourceCardTitle() {
	const { title } = useResourceCardContext();

	return <h4 className="text-zinc-700 uppercase -mt-2 text-xl truncate">{title}</h4>;
};

ResourceCard.Description = function ResourceCardDescription() {
	const { description } = useResourceCardContext();

	return (
		<ResourceDescriptionTooltip
			description={description}
			triggerClass="text-sm truncate text-zinc-500 hover:text-zinc-300"
		/>
	);
};

ResourceCard.Badges = function ResourceCardBadges() {
	const { kinds } = useResourceCardContext();

	return (
		<div className="flex items-center space-x-2 mt-2">
			{kinds.map(kind => (
				<Badge key={kind}>{kind}</Badge>
			))}
		</div>
	);
};

ResourceCard.FavCount = function ResourceCardFavCount() {
	const { favCount } = useResourceCardContext();

	return <FavCountButton favCount={favCount} />;
};

ResourceCard.DetailButton = function ResourceCardDetailButton() {
	const { resourceUrl } = useResourceCardContext();

	return <DetailButton resourceUrl={resourceUrl} />;
};

export default ResourceCard;
