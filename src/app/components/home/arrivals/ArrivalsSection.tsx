import ArrivalsCard from './ArrivalsCard';
import { isError } from '@/lib/either';
import { toast } from '../../ui/use-toast';
import { provideListHeroResourceUsecase } from '@/features/home';

const ArrivalsSection = async () => {
	const heroResourcesUsecase = provideListHeroResourceUsecase();
	const getHeroResourcesListResponse = await heroResourcesUsecase.listHeroResources();
	if (isError(getHeroResourcesListResponse)) {
		toast({
			variant: 'destructive',
			description: getHeroResourcesListResponse.error,
		});
	}
	return (
		<>
			{!isError(getHeroResourcesListResponse) && (
				<section className='relative grid place-items-center w-screen h-screen pt-32'>
					<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(var(--bg-dots)_1px,transparent_1px)] [background-size:16px_16px]'></div>
					<ArrivalsCard resources={getHeroResourcesListResponse.success} />
				</section>
			)}
		</>
	);
};

export default ArrivalsSection;
