'use server';

import HeroCTA from './HeroCTA';
import HeroResourcesList from './HeroResourcesList';
import HeroText from './HeroText';
import { auth } from '@/auth';

const HeroSection = async () => {
	const session = await auth();

	return (
		<section className="flex flex-col items-center gap-8 pt-20">
			<HeroText />
			<HeroCTA user={session?.user} />
			<HeroResourcesList />
		</section>
	);
};

export default HeroSection;
