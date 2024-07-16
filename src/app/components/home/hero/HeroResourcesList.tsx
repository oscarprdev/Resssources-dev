import { isError } from '@/lib/either';
import HeroResourceItem from './HeroResourceItem';
import { toast } from '../../ui/use-toast';
import { provideListHeroResourceUsecase } from '@/features/home';

const HeroResourcesList = async () => {
	const heroResourcesUsecase = provideListHeroResourceUsecase();
	const getHeroResourcesListResponse = await heroResourcesUsecase.listHeroResources();
	if (isError(getHeroResourcesListResponse)) {
		toast({
			variant: 'destructive',
			description: getHeroResourcesListResponse.error,
		});
	}

	return (
		<section className='relative mt-16 flex w-fit items-center'>
			{!isError(getHeroResourcesListResponse) && getHeroResourcesListResponse.success.length > 0 && (
				<>
					<ul className='marquee1-animation flex w-full items-center gap-4 overflow-hidden'>
						{getHeroResourcesListResponse.success.map(({ resourceId, title, imgUrl }) => (
							<HeroResourceItem
								key={resourceId}
								resourceId={resourceId}
								title={title}
								imgUrl={imgUrl}
							/>
						))}
					</ul>
					<ul className='marquee2-animation absolute top-0 ml-4 flex w-full items-center gap-4 overflow-hidden'>
						{getHeroResourcesListResponse.success.map(({ resourceId, title, imgUrl }) => (
							<HeroResourceItem
								key={resourceId}
								resourceId={resourceId}
								title={title}
								imgUrl={imgUrl}
							/>
						))}
					</ul>
				</>
			)}
		</section>
	);
};

export default HeroResourcesList;
