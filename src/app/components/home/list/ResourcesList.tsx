'use client';

import ResourceCard from '../../core/containers/ResourceCard';
import ResourceCardSkeleton from '../../core/skeletons/ResourceCardSkeleton';
import { useResourcesListWithPagination } from '@/app/hooks/useResourcesListPagination';
import { Kinds, ResourceWithUserInfo } from '@/features/resources/shared/resources.types';

type ResourcesListControllerProps = {
	kindsFilter: Kinds;
};

export const ResourcesListController = ({ kindsFilter }: ResourcesListControllerProps) => {
	const { loading, resources } = useResourcesListWithPagination(kindsFilter);

	return (
		<div className="show-container relative grid w-full max-w-viewport grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 px-24 min-h-screen">
			{loading ? (
				<ResourceListLoading />
			) : resources.length === 0 ? (
				<ResourceListNoResults />
			) : (
				<ResourcesList resources={resources} />
			)}
		</div>
	);
};

type ResourcesListProps = {
	resources: ResourceWithUserInfo[];
};

export const ResourcesList = ({ resources }: ResourcesListProps) => {
	return (
		<>
			{resources.map(resource => (
				<ResourceCard
					key={resource.id}
					resourceId={resource.id}
					title={resource.title}
					description={resource.description}
					resourceUrl={resource.resourceUrl}
					imgUrl={resource.imgUrl}
					owner={resource.resourceCreatedBy[0].username}
					kinds={resource.kind}
					favCount={10}
					isLiked={resource.favouritedBy.some(user => user.userId === resource.resourceCreatedBy[0].userId)}
				/>
			))}
		</>
	);
};

export const ResourceListNoResults = () => {
	return (
		<div className="absolute top-10 grid w-full place-items-center p-10">
			<p className="text-sm text-zinc-600 text-center">0 results</p>
		</div>
	);
};

export const ResourceListLoading = () => {
	return (
		<>
			<ResourceCardSkeleton />
			<ResourceCardSkeleton />
			<ResourceCardSkeleton />
			<ResourceCardSkeleton />
		</>
	);
};
