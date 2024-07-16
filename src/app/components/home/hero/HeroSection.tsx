'use server';

import { auth } from '@/auth';
import HeroCTA from './HeroCTA';
import HeroResourcesList from './HeroResourcesList';
import HeroText from './HeroText';

const HeroSection = async () => {
	const session = await auth();

	return (
		<section className='flex flex-col items-center gap-8'>
			<HeroText />
			<HeroCTA user={session?.user} />
			<HeroResourcesList />
		</section>
	);
};

export default HeroSection;
