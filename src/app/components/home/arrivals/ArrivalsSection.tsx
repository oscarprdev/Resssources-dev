import ArrivalsCard from './ArrivalsCard';
import { isError } from '@/lib/either';
import { toast } from '../../ui/use-toast';
import { provideListResourceUsecase } from '@/features/resources/list';

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
				<section className='relative grid place-items-center w-screen h-screen pt-32'>
					<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(var(--bg-dots)_1px,transparent_1px)] [background-size:16px_16px]'></div>
					<ArrivalsCard resources={resourcesResponse.success} />
				</section>
			)}
		</>
	);
};

export default ArrivalsSection;
