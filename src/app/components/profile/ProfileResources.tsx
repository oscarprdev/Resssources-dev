'use client';

import ResourceCard from '../core/containers/ResourceCard';
import ResourcesFilters from '../core/containers/ResourcesFilters';
import ResourceCardSkeleton from '../core/skeletons/ResourceCardSkeleton';
import ProfileResourcesTabs from './ProfileResourcesTabs';
import { useResourcesProfileListWithPagination } from '@/app/hooks/useResourcesProfileListPagination';
import { ResourceWithUserInfo } from '@/features/resources/shared/resources.types';
import { Kinds, ResourceType } from '@/features/shared/types/global.types';
import { useState } from 'react';

export type ProfileResourcesProps = {
	userId: string;
	kindsFilters: Kinds;
};

const ProfileResources = ({ userId, kindsFilters }: ProfileResourcesProps) => {
	const [tabSelected, setTabSelected] = useState<ResourceType>(ResourceType.SHARED);
	const { loading, resources } = useResourcesProfileListWithPagination(kindsFilters, tabSelected, userId);

	const handleTabSelect = (value: ResourceType) => setTabSelected(value);

	return (
		<section className="w-[90vw] sm:w-full flex flex-col gap-5 items-center">
			<ProfileResourcesTabs handleTabSelect={handleTabSelect} />
			<ResourcesFilters />
			<div className="relative grid w-full max-w-viewport grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 sm:px-24 min-h-screen">
				{loading ? (
					<ResourceListLoading />
				) : resources.length === 0 ? (
					<ResourceListNoResults />
				) : (
					<ResourcesList resources={resources} />
				)}
			</div>
		</section>
	);
};

type ResourcesListProps = {
	resources: ResourceWithUserInfo[];
};

const ResourcesList = ({ resources }: ResourcesListProps) => {
	return (
		<>
			{resources.map(resource => (
				<ResourceCard
					key={resource.id}
					props={{
						resourceId: resource.id,
						title: resource.title,
						description: resource.description,
						resourceUrl: resource.resourceUrl,
						imgUrl: resource.imgUrl,
						kinds: resource.kind,
						owner: resource.resourceCreatedBy[0].username,
						favCount: resource.favouritedBy.length,
						isLiked: resource.favouritedBy.some(
							user => user.userId === resource.resourceCreatedBy[0].userId
						),
					}}>
					<ResourceCard.Like />
					<ResourceCard.Image />
					<ResourceCard.Content>
						<ResourceCard.Title />
						<ResourceCard.Description />
						<ResourceCard.Badges />
						<ResourceCard.Footer>
							<ResourceCard.FavCount />
							<ResourceCard.DetailButton />
						</ResourceCard.Footer>
					</ResourceCard.Content>
				</ResourceCard>
			))}
		</>
	);
};

const ResourceListNoResults = () => {
	return (
		<div className="absolute top-10 grid w-full place-items-center p-10">
			<p className="text-sm text-zinc-600 text-center">0 results</p>
		</div>
	);
};

const ResourceListLoading = () => {
	return (
		<>
			<ResourceCardSkeleton />
			<ResourceCardSkeleton />
			<ResourceCardSkeleton />
			<ResourceCardSkeleton />
		</>
	);
};

export default ProfileResources;
