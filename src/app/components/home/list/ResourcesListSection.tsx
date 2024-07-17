import { provideListResourceUsecase } from '@/features/resources/list';
import { isError } from '@/lib/either';
import { toast } from '../../ui/use-toast';
import Section from '../../core/containers/Section';
import { Kinds } from '@/features/resources/shared/resources.types';
import ResourcesList from './ResourcesList';
import ResourcesFilters from '../../core/containers/ResourcesFilters';

type ResourcesListSectionProps = {
	kindFilter: Kinds;
};

const ResourcesListSection = async ({ kindFilter }: ResourcesListSectionProps) => {
	const listResourcesUsecase = provideListResourceUsecase();
	const resourcesResponse = await listResourcesUsecase.listResources({ published: true, withUserData: true, itemsPerRequest: 10 });
	if (isError(resourcesResponse)) {
		toast({
			variant: 'destructive',
			description: resourcesResponse.error,
		});
	}

	return (
		<Section>
			<div className='w-full max-w-viewport px-24 mb-5'>
				<h3 className='text-2xl text-zinc-600'>See All Resources</h3>
			</div>

			{!isError(resourcesResponse) && resourcesResponse.success.length > 0 && (
				<>
					<ResourcesFilters />
					<ResourcesList resources={resourcesResponse.success} />
				</>
			)}
		</Section>
	);
};

export default ResourcesListSection;
