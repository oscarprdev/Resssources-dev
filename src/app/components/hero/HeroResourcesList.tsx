import { getHeroResourcesList } from '@/app/actions';
import { provideHeroResourceUsecase } from '@/features/hero-resources';
import { isError } from '@/lib/either';
import HeroResourceItem from './HeroResourceItem';

const HeroResourcesList = async () => {
	const heroResourcesUsecase = provideHeroResourceUsecase();
	const getHeroResourcesListResponse = await getHeroResourcesList(heroResourcesUsecase);
	if (isError(getHeroResourcesListResponse)) {
		console.log(getHeroResourcesListResponse.error);
		return;
	}

	return (
		<section className='relative mt-20 flex w-fit items-center'>
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
		</section>
	);
};

export default HeroResourcesList;
