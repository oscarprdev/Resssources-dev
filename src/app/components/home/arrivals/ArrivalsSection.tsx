import Section from '../../core/containers/Section';
import ArrivalsCard from './ArrivalsCard';
import { provideListResourceUsecase } from '@/features/resources/list';
import { ResourceWithUserInfo } from '@/features/resources/shared/resources.types';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
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
		<div className="hidden sm:block">
			{!isError(resourcesResponse) && resourcesResponse.success.items.length > 0 && (
				<Section>
					<ArrivalsCard resources={resourcesResponse.success.items as ResourceWithUserInfo[]} />
				</Section>
			)}
		</div>
	);
};

export default ArrivalsSection;
