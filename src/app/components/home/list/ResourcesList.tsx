import { ResourceWithUserInfo } from '@/features/resources/shared/resources.types';
import ResourceCard from '../../core/containers/ResourceCard';

type ResourcesListProps = {
	resources: ResourceWithUserInfo[];
};

const ResourcesList = ({ resources }: ResourcesListProps) => {
	return (
		<div className='show-container w-full px-24 py-10 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 max-w-viewport'>
			{resources.map((resource) => (
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
					isLiked={resource.favouritedBy.some((user) => user.userId === resource.resourceCreatedBy[0].userId)}
				/>
			))}
		</div>
	);
};

export default ResourcesList;
