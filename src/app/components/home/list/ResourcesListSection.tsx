import ResourcesFilters from '../../core/containers/ResourcesFilters';
import Section from '../../core/containers/Section';
import { ResourcesListController } from './ResourcesList';
import { Kinds } from '@/features/resources/shared/resources.types';

type ResourcesListSectionProps = {
	kindsFilter: Kinds;
};

const ResourcesListSection = ({ kindsFilter }: ResourcesListSectionProps) => {
	return (
		<Section id="all-resources">
			<div className="flex flex-col gap-5 w-full">
				<div className="w-full max-w-viewport px-24 mb-5">
					<h3 className="text-2xl text-zinc-600">See All Resources</h3>
				</div>
				<div className="flex flex-col items-center justify-start w-full gap-5">
					<ResourcesFilters />
					<ResourcesListController kindsFilter={kindsFilter} />
				</div>
			</div>
		</Section>
	);
};

export default ResourcesListSection;
