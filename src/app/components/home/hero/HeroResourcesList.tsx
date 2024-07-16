import { isError } from '@/lib/either';
import HeroResourceItem from './HeroResourceItem';
import { toast } from '../../ui/use-toast';
import { provideListResourceUsecase } from '@/features/resources/list';

const HeroResourcesList = async () => {
	const listResourcesUsecase = provideListResourceUsecase();
	const resourcesResponse = await listResourcesUsecase.listResourcesImages();
	if (isError(resourcesResponse)) {
		toast({
			variant: 'destructive',
			description: resourcesResponse.error,
		});
	}

	return (
		<section className='relative mt-16 flex w-fit items-center'>
			{!isError(resourcesResponse) && resourcesResponse.success.length > 0 && (
				<>
					<ul className='marquee1-animation flex w-full items-center gap-4 overflow-hidden'>
						{resourcesResponse.success.map(({ id, imgUrl }) => (
							<HeroResourceItem
								key={id}
								resourceId={id}
								imgUrl={imgUrl}
							/>
						))}
					</ul>
					<ul className='marquee2-animation absolute top-0 ml-4 flex w-full items-center gap-4 overflow-hidden'>
						{resourcesResponse.success.map(({ id, imgUrl }) => (
							<HeroResourceItem
								key={id}
								resourceId={id}
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
