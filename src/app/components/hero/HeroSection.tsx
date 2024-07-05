import HeroCTA from './HeroCTA';
import HeroResourcesList from './HeroResourcesList';
import HeroText from './HeroText';

const HeroSection = () => {
	return (
		<section className='flex flex-col items-center gap-8'>
			<HeroText />
			<HeroCTA />
			<HeroResourcesList />
		</section>
	);
};

export default HeroSection;
