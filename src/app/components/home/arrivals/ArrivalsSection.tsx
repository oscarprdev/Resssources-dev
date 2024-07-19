import Section from '../../core/containers/Section';
import ArrivalsCard from './ArrivalsCard';
import { RESOURCE_KIND_VALUES } from '@/features/resources/create/application/create-resources.schemas';
import { provideListResourceUsecase } from '@/features/resources/list';
import { isError } from '@/lib/either';

const ArrivalsSection = async () => {
	const listResourcesUsecase = provideListResourceUsecase();
	const resourcesResponse = await listResourcesUsecase.listResources({
		published: true,
		withUserData: true,
		itemsPerRequest: 10,
		kinds: RESOURCE_KIND_VALUES,
	});

	return (
		<>
			{!isError(resourcesResponse) && resourcesResponse.success.items.length > 0 && (
				<Section>
					<ArrivalsCard resources={resourcesResponse.success.items} />
				</Section>
			)}
		</>
	);
};

export default ArrivalsSection;
