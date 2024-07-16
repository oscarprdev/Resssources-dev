import ArrivalsCard from './ArrivalsCard';
import { isError } from '@/lib/either';
import { toast } from '../../ui/use-toast';
import { provideListArrivalsResourceUsecase } from '@/features/home';

const ArrivalsSection = async () => {
	const arrivalsResourcesUsecase = provideListArrivalsResourceUsecase();
	const getArrivalsResourcesListResponse = await arrivalsResourcesUsecase.listArrivalsResources();
	if (isError(getArrivalsResourcesListResponse)) {
		toast({
			variant: 'destructive',
			description: getArrivalsResourcesListResponse.error,
		});
	}
	return (
		<>
			{!isError(getArrivalsResourcesListResponse) && (
				<section className='relative grid place-items-center w-screen h-screen pt-32'>
					<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(var(--bg-dots)_1px,transparent_1px)] [background-size:16px_16px]'></div>
					<ArrivalsCard resources={getArrivalsResourcesListResponse.success} />
				</section>
			)}
		</>
	);
};

export default ArrivalsSection;
