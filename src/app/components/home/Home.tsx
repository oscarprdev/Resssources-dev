import ArrivalsSection from './arrivals/ArrivalsSection';
import HeroSection from './hero/HeroSection';
import ResourcesListSection from './list/ResourcesListSection';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { Kinds } from '@/features/shared/types/global.types';

type HomeProps = {
	kinds: string;
};

const Home = ({ kinds }: HomeProps) => {
	const kindsFilter = kinds ? (kinds.split(',') as Kinds) : RESOURCE_KIND_VALUES;

	return (
		<>
			<HeroSection />
			<ArrivalsSection />
			<ResourcesListSection kindsFilter={kindsFilter} />
		</>
	);
};

export default Home;
