import ArrivalsCard from './ArrivalsCard';
import { isError } from '@/lib/either';
import { toast } from '../../ui/use-toast';
import { provideListResourceUsecase } from '@/features/resources/list';
import Section from '../../core/containers/Section';

const ArrivalsSection = async () => {
	const listResourcesUsecase = provideListResourceUsecase();
	const resourcesResponse = await listResourcesUsecase.listResources({
		published: true,
		withUserData: true,
		itemsPerRequest: 10,
	});
	if (isError(resourcesResponse)) {
		toast({
			variant: 'destructive',
			description: resourcesResponse.error,
		});
	}
	return (
		<>
			{!isError(resourcesResponse) && (
				<Section>
					<ArrivalsCard resources={resourcesResponse.success} />
				</Section>
			)}
		</>
	);
};

export default ArrivalsSection;
