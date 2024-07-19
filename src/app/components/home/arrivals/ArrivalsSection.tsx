import Section from '../../core/containers/Section';
import ArrivalsCard from './ArrivalsCard';
import { provideListResourceUsecase } from '@/features/resources/list';
import { isError } from '@/lib/either';

const ArrivalsSection = async () => {
	const listResourcesUsecase = provideListResourceUsecase();
	const resourcesResponse = await listResourcesUsecase.listResources({
		published: true,
		withUserData: true,
		itemsPerRequest: 10,
	});

	return (
		<>
			{!isError(resourcesResponse) && (
				<Section>
					<ArrivalsCard resources={resourcesResponse.success.resources} />
				</Section>
			)}
		</>
	);
};

export default ArrivalsSection;
