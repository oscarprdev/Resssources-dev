import { IconQuote } from '@tabler/icons-react';

const HeroText = () => {
	return (
		<div className="flex flex-col text-center gap-2">
			<h1 className="text-6xl uppercase">Resources</h1>

			<div className="relative flex items-center p-2">
				<IconQuote size={16} className="absolute top-2 -left-2 transform -rotate-180" />
				<p className="text-xl">Find, share and store your favourites dev resources</p>
				<IconQuote size={16} className="absolute top-2 -right-2" />
			</div>
		</div>
	);
};

export default HeroText;
