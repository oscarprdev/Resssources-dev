import HeroResourceItem from './HeroResourceItem';
import { provideListResourceUsecase } from '@/features/resources/list';
import { isError } from '@/lib/either';

const HeroResourcesList = async () => {
	const listResourcesUsecase = provideListResourceUsecase();
	const resourcesResponse = await listResourcesUsecase.listResourcesImages();

	return (
		<section className="relative mt-16 flex w-fit items-center">
			{!isError(resourcesResponse) && resourcesResponse.success.length > 0 && (
				<>
					<ul className="marquee1-animation flex w-full items-center gap-4 overflow-hidden">
						{resourcesResponse.success.map(({ id, imgUrl, title, url }) => (
							<HeroResourceItem key={id} resourceUrl={url} imgUrl={imgUrl} title={title} />
						))}
					</ul>
					<ul className="marquee2-animation absolute top-0 ml-4 flex w-full items-center gap-4 overflow-hidden">
						{resourcesResponse.success.map(({ id, imgUrl, title, url }) => (
							<HeroResourceItem key={id} resourceUrl={url} imgUrl={imgUrl} title={title} />
						))}
					</ul>
				</>
			)}
		</section>
	);
};

export default HeroResourcesList;
