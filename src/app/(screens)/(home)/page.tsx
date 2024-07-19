import ArrivalsSection from '@/app/components/home/arrivals/ArrivalsSection';
import HeroSection from '@/app/components/home/hero/HeroSection';
import ResourcesListSection from '@/app/components/home/list/ResourcesListSection';
import { RESOURCE_KIND_VALUES } from '@/features/resources/create/application/create-resources.schemas';
import { Kinds } from '@/features/resources/shared/resources.types';

type HomePageProps = {
	searchParams: {
		kinds: string;
	};
};

export default function Home({ searchParams: { kinds } }: HomePageProps) {
	const kindsFilter = kinds ? (kinds.split(',') as Kinds) : RESOURCE_KIND_VALUES;

	return (
		<>
			<HeroSection />
			<ArrivalsSection />
			<ResourcesListSection kindsFilter={kindsFilter} />
		</>
	);
}
